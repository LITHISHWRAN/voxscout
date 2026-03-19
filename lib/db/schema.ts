import { pgTable, text, timestamp, uuid, varchar, boolean } from 'drizzle-orm/pg-core';
import { sql } from 'drizzle-orm';

// Users table with Clerk integration
export const users = pgTable('users', {
  id: uuid('id').defaultRandom().primaryKey(),
  clerkId: varchar('clerk_id', { length: 255 }).notNull().unique(), // Clerk user ID
  email: varchar('email', { length: 255 }).notNull().unique(),
  firstName: varchar('first_name', { length: 255 }),
  lastName: varchar('last_name', { length: 255 }),
  imageUrl: text('image_url'), // Profile image from Clerk
  emailVerified: boolean('email_verified').default(false),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// Example Posts table - customize or remove based on your needs
export const posts = pgTable('posts', {
  id: uuid('id').defaultRandom().primaryKey(),
  title: varchar('title', { length: 255 }).notNull(),
  content: text('content'),
  authorId: uuid('author_id').references(() => users.id, { onDelete: 'cascade' }),
  published: boolean('published').default(false),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// Add more tables as needed for your VoxScout application
// Example:
// export const recordings = pgTable('recordings', {
//   id: uuid('id').defaultRandom().primaryKey(),
//   userId: uuid('user_id').references(() => users.id, { onDelete: 'cascade' }),
//   audioUrl: text('audio_url').notNull(),
//   transcription: text('transcription'),
//   createdAt: timestamp('created_at').defaultNow().notNull(),
// });
