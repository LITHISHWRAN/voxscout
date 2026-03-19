import { db } from './index';
import { users, posts } from './schema';
import { eq } from 'drizzle-orm';

/**
 * Example database queries
 * Add your own queries here as needed
 */

// User queries
export const userQueries = {
  // Get all users
  getAll: async () => {
    return await db.select().from(users);
  },

  // Get user by ID
  getById: async (id: string) => {
    const result = await db.select().from(users).where(eq(users.id, id));
    return result[0];
  },

  // Get user by email
  getByEmail: async (email: string) => {
    const result = await db.select().from(users).where(eq(users.email, email));
    return result[0];
  },

  // Get user by Clerk ID
  getByClerkId: async (clerkId: string) => {
    const result = await db.select().from(users).where(eq(users.clerkId, clerkId));
    return result[0];
  },

  // Create user (for Clerk webhook)
  create: async (data: { 
    clerkId: string; 
    email: string; 
    firstName?: string; 
    lastName?: string;
    imageUrl?: string;
    emailVerified?: boolean;
  }) => {
    const result = await db.insert(users).values(data).returning();
    return result[0];
  },

  // Update user
  update: async (id: string, data: Partial<{ 
    firstName: string; 
    lastName: string; 
    imageUrl: string;
    emailVerified: boolean;
  }>) => {
    const result = await db
      .update(users)
      .set({ ...data, updatedAt: new Date() })
      .where(eq(users.id, id))
      .returning();
    return result[0];
  },

  // Update user by Clerk ID
  updateByClerkId: async (clerkId: string, data: Partial<{ 
    email: string;
    firstName: string; 
    lastName: string; 
    imageUrl: string;
    emailVerified: boolean;
  }>) => {
    const result = await db
      .update(users)
      .set({ ...data, updatedAt: new Date() })
      .where(eq(users.clerkId, clerkId))
      .returning();
    return result[0];
  },

  // Delete user
  delete: async (id: string) => {
    await db.delete(users).where(eq(users.id, id));
  },
};

// Post queries
export const postQueries = {
  // Get all posts
  getAll: async () => {
    return await db.select().from(posts);
  },

  // Get post by ID
  getById: async (id: string) => {
    const result = await db.select().from(posts).where(eq(posts.id, id));
    return result[0];
  },

  // Get posts by author
  getByAuthor: async (authorId: string) => {
    return await db.select().from(posts).where(eq(posts.authorId, authorId));
  },

  // Create post
  create: async (data: { title: string; content?: string; authorId: string; published?: boolean }) => {
    const result = await db.insert(posts).values(data).returning();
    return result[0];
  },

  // Update post
  update: async (id: string, data: Partial<{ title: string; content: string; published: boolean }>) => {
    const result = await db
      .update(posts)
      .set({ ...data, updatedAt: new Date() })
      .where(eq(posts.id, id))
      .returning();
    return result[0];
  },

  // Delete post
  delete: async (id: string) => {
    await db.delete(posts).where(eq(posts.id, id));
  },
};
