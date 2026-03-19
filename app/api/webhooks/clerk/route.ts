import { Webhook } from 'svix';
import { headers } from 'next/headers';
import { WebhookEvent } from '@clerk/nextjs/server';
import { userQueries } from '@/lib/db/queries';

export async function POST(req: Request) {
  // Get the webhook secret from environment variables
  const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET;

  if (!WEBHOOK_SECRET) {
    throw new Error('Please add CLERK_WEBHOOK_SECRET to .env');
  }

  // Get the headers
  const headerPayload = await headers();
  const svix_id = headerPayload.get('svix-id');
  const svix_timestamp = headerPayload.get('svix-timestamp');
  const svix_signature = headerPayload.get('svix-signature');

  // If there are no headers, error out
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response('Error occurred -- no svix headers', {
      status: 400,
    });
  }

  // Get the body
  const payload = await req.json();
  const body = JSON.stringify(payload);

  // Create a new Svix instance with your secret
  const wh = new Webhook(WEBHOOK_SECRET);

  let evt: WebhookEvent;

  // Verify the payload with the headers
  try {
    evt = wh.verify(body, {
      'svix-id': svix_id,
      'svix-timestamp': svix_timestamp,
      'svix-signature': svix_signature,
    }) as WebhookEvent;
  } catch (err) {
    console.error('Error verifying webhook:', err);
    return new Response('Error occurred', {
      status: 400,
    });
  }

  // Handle the webhook
  const eventType = evt.type;

  if (eventType === 'user.created') {
    const { id, email_addresses, first_name, last_name, image_url } = evt.data;

    // Get the primary email
    const primaryEmail = email_addresses.find(
      (email) => email.id === evt.data.primary_email_address_id
    );

    if (!primaryEmail) {
      return new Response('No primary email found', { status: 400 });
    }

    try {
      // Create user in database
      await userQueries.create({
        clerkId: id,
        email: primaryEmail.email_address,
        firstName: first_name || undefined,
        lastName: last_name || undefined,
        imageUrl: image_url || undefined,
        emailVerified: primaryEmail.verification?.status === 'verified',
      });

      console.log('User created in database:', id);
    } catch (error) {
      console.error('Error creating user in database:', error);
      return new Response('Error creating user', { status: 500 });
    }
  }

  if (eventType === 'user.updated') {
    const { id, email_addresses, first_name, last_name, image_url } = evt.data;

    // Get the primary email
    const primaryEmail = email_addresses.find(
      (email) => email.id === evt.data.primary_email_address_id
    );

    if (!primaryEmail) {
      return new Response('No primary email found', { status: 400 });
    }

    try {
      // Update user in database
      await userQueries.updateByClerkId(id, {
        email: primaryEmail.email_address,
        firstName: first_name || undefined,
        lastName: last_name || undefined,
        imageUrl: image_url || undefined,
        emailVerified: primaryEmail.verification?.status === 'verified',
      });

      console.log('User updated in database:', id);
    } catch (error) {
      console.error('Error updating user in database:', error);
      return new Response('Error updating user', { status: 500 });
    }
  }

  if (eventType === 'user.deleted') {
    const { id } = evt.data;

    try {
      // Find and delete user from database
      const user = await userQueries.getByClerkId(id!);
      if (user) {
        await userQueries.delete(user.id);
        console.log('User deleted from database:', id);
      }
    } catch (error) {
      console.error('Error deleting user from database:', error);
      return new Response('Error deleting user', { status: 500 });
    }
  }

  return new Response('Webhook processed successfully', { status: 200 });
}
