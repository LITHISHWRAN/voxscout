# Clerk Authentication Setup Guide

This guide will help you set up Clerk authentication for VoxScout.

## Prerequisites

- A Clerk account (sign up at https://clerk.com)
- A Neon PostgreSQL database (already configured)
- Node.js and npm installed

## Step 1: Create a Clerk Application

1. Go to https://dashboard.clerk.com
2. Click "Add application" or create a new application
3. Choose your application name (e.g., "VoxScout")
4. Select the authentication methods you want to enable:
   - Email/Password
   - Google OAuth
   - GitHub OAuth
   - etc.
5. Click "Create application"

## Step 2: Get Your Clerk API Keys

After creating your application:

1. In the Clerk Dashboard, go to "API Keys" in the left sidebar
2. Copy your **Publishable Key** (starts with `pk_test_` or `pk_live_`)
3. Copy your **Secret Key** (starts with `sk_test_` or `sk_live_`)

## Step 3: Configure Environment Variables

1. Open your `.env` file in the project root
2. Add your Clerk keys:

```env
# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_your_key_here
CLERK_SECRET_KEY=sk_test_your_secret_key_here

# Clerk URLs (already configured)
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/dashboard
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/dashboard
```

## Step 4: Set Up Clerk Webhook

The webhook automatically saves user data to your database when users sign up or update their profile.

### 4.1 Create the Webhook in Clerk Dashboard

1. In Clerk Dashboard, go to "Webhooks" in the left sidebar
2. Click "Add Endpoint"
3. Enter your webhook URL:
   - For development: Use a tool like **ngrok** to expose your local server
     ```bash
     ngrok http 3000
     ```
   - Your webhook URL will be: `https://your-ngrok-url.ngrok.io/api/webhooks/clerk`
   - For production: `https://your-domain.com/api/webhooks/clerk`

4. Select the events to listen to:
   - ✅ `user.created`
   - ✅ `user.updated`
   - ✅ `user.deleted`

5. Click "Create"

### 4.2 Get Your Webhook Secret

1. After creating the webhook, click on it to view details
2. Copy the **Signing Secret** (starts with `whsec_`)
3. Add it to your `.env` file:

```env
CLERK_WEBHOOK_SECRET=whsec_your_webhook_secret_here
```

## Step 5: Update Your Database Schema

Run the following commands to update your database with the new user schema:

```bash
# Generate migration files
npm run db:generate

# Push changes to database
npm run db:push
```

Or if you prefer to use migrations:

```bash
# Generate migration
npm run db:generate

# Apply migration
npm run db:migrate
```

## Step 6: Test the Authentication Flow

1. Start your development server:
   ```bash
   npm run dev
   ```

2. Open your browser and go to `http://localhost:3000`

3. Test the authentication:
   - Click "Sign Up" to create a new account
   - Fill in the registration form
   - Verify your email (if email verification is enabled)
   - You should be redirected to `/dashboard`
   - Check your database to confirm the user was saved

4. Test sign out and sign in:
   - Click the user button in the dashboard header
   - Sign out
   - Go to `/sign-in` and sign in with your credentials
   - You should be redirected back to the dashboard

## Step 7: Verify Webhook Integration

1. Sign up with a new user
2. Check your terminal/console for webhook logs:
   - You should see: `User created in database: user_xxxxx`
3. Check your database to confirm the user record was created
4. Update your profile in Clerk (change name, email, etc.)
5. Verify the changes are reflected in your database

## Available Routes

After setup, these routes are available:

- `/` - Public landing page
- `/sign-in` - Sign in page
- `/sign-up` - Sign up page
- `/dashboard` - Protected dashboard (requires authentication)

## Protecting Routes

Routes are automatically protected by the middleware. To make a route public, add it to the `isPublicRoute` matcher in `middleware.ts`:

```typescript
const isPublicRoute = createRouteMatcher([
  '/',
  '/sign-in(.*)',
  '/sign-up(.*)',
  '/api/webhooks(.*)',
  '/your-public-route', // Add your public routes here
]);
```

## Using Authentication in Your Components

### Server Components

```typescript
import { currentUser } from '@clerk/nextjs/server';

export default async function MyPage() {
  const user = await currentUser();
  
  if (!user) {
    // Handle unauthenticated state
    return <div>Please sign in</div>;
  }
  
  return <div>Hello {user.firstName}!</div>;
}
```

### Client Components

```typescript
'use client';

import { useUser } from '@clerk/nextjs';

export default function MyComponent() {
  const { user, isLoaded, isSignedIn } = useUser();
  
  if (!isLoaded) {
    return <div>Loading...</div>;
  }
  
  if (!isSignedIn) {
    return <div>Please sign in</div>;
  }
  
  return <div>Hello {user.firstName}!</div>;
}
```

## Accessing User Data from Database

```typescript
import { currentUser } from '@clerk/nextjs/server';
import { userQueries } from '@/lib/db/queries';

export default async function MyPage() {
  const clerkUser = await currentUser();
  
  if (!clerkUser) {
    return <div>Please sign in</div>;
  }
  
  // Get user from your database
  const dbUser = await userQueries.getByClerkId(clerkUser.id);
  
  return (
    <div>
      <p>Email: {dbUser.email}</p>
      <p>Name: {dbUser.firstName} {dbUser.lastName}</p>
    </div>
  );
}
```

## Troubleshooting

### Webhook Not Working

1. **Check webhook URL**: Make sure your webhook URL is accessible from the internet
2. **Verify webhook secret**: Ensure `CLERK_WEBHOOK_SECRET` is correctly set in `.env`
3. **Check logs**: Look for error messages in your terminal
4. **Test webhook**: Use Clerk Dashboard's "Send Test Event" feature

### Users Not Saving to Database

1. **Check database connection**: Verify `DATABASE_URL` is correct
2. **Run migrations**: Make sure you ran `npm run db:push` or `npm run db:migrate`
3. **Check webhook logs**: Look for errors in the webhook endpoint
4. **Verify schema**: Ensure the `users` table has all required fields

### Authentication Not Working

1. **Check environment variables**: Verify all Clerk keys are set correctly
2. **Restart dev server**: After changing `.env`, restart your server
3. **Clear browser cache**: Sometimes cached data can cause issues
4. **Check middleware**: Ensure `middleware.ts` is in the root directory

## Production Deployment

When deploying to production:

1. **Update environment variables** in your hosting platform (Vercel, Netlify, etc.)
2. **Update webhook URL** in Clerk Dashboard to your production URL
3. **Use production Clerk keys** (starts with `pk_live_` and `sk_live_`)
4. **Enable email verification** for better security
5. **Configure custom domains** in Clerk Dashboard if needed

## Additional Resources

- [Clerk Documentation](https://clerk.com/docs)
- [Clerk Next.js Quickstart](https://clerk.com/docs/quickstarts/nextjs)
- [Clerk Webhooks Guide](https://clerk.com/docs/integrations/webhooks)
- [Drizzle ORM Documentation](https://orm.drizzle.team/)

## Support

If you encounter any issues:

1. Check the [Clerk Discord](https://clerk.com/discord)
2. Review [Clerk Documentation](https://clerk.com/docs)
3. Check the project's GitHub issues
