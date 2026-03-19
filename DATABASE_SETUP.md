# Database Setup Guide

## Quick Start

### 1. Get Your Neon Database URL

1. Go to [https://console.neon.tech](https://console.neon.tech)
2. Sign up or log in
3. Click "Create Project"
4. Give your project a name (e.g., "voxscout")
5. Select your region (choose closest to your users)
6. Click "Create Project"
7. Copy the connection string from the dashboard

### 2. Configure Environment Variables

Create a `.env.local` file in the root directory:

```bash
cp .env.example .env.local
```

Edit `.env.local` and add your Neon database URL:

```env
DATABASE_URL=postgresql://username:password@ep-xxx-xxx.region.aws.neon.tech/dbname?sslmode=require
```

### 3. Push Schema to Database

Run the following command to create tables in your database:

```bash
npm run db:push
```

This will create the `users` and `posts` tables defined in `lib/db/schema.ts`.

### 4. Verify Setup

You can open Drizzle Studio to visually inspect your database:

```bash
npm run db:studio
```

This will open a browser window at `https://local.drizzle.studio` where you can view and edit your data.

## Project Structure

```
lib/db/
├── index.ts       # Database connection and Drizzle instance
├── schema.ts      # Database schema definitions
└── queries.ts     # Reusable query functions
```

## Common Tasks

### Adding a New Table

1. Edit `lib/db/schema.ts` and add your table definition:

```typescript
export const recordings = pgTable('recordings', {
  id: uuid('id').defaultRandom().primaryKey(),
  userId: uuid('user_id').references(() => users.id, { onDelete: 'cascade' }),
  title: varchar('title', { length: 255 }).notNull(),
  audioUrl: text('audio_url').notNull(),
  transcription: text('transcription'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});
```

2. Push changes to database:

```bash
npm run db:push
```

### Creating Migrations (Production)

For production, use migrations instead of `db:push`:

1. Generate migration:
```bash
npm run db:generate
```

2. Review the generated SQL in `drizzle/` directory

3. Apply migration:
```bash
npm run db:migrate
```

### Using the Database in Your Code

#### Direct Queries

```typescript
import { db } from '@/lib/db';
import { users } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';

// Select
const allUsers = await db.select().from(users);

// Insert
await db.insert(users).values({
  email: 'user@example.com',
  name: 'John Doe'
});

// Update
await db.update(users)
  .set({ name: 'Jane Doe' })
  .where(eq(users.id, userId));

// Delete
await db.delete(users).where(eq(users.id, userId));
```

#### Using Query Helpers

```typescript
import { userQueries } from '@/lib/db/queries';

// Get user by email
const user = await userQueries.getByEmail('user@example.com');

// Create user
const newUser = await userQueries.create({
  email: 'new@example.com',
  name: 'New User'
});

// Update user
await userQueries.update(userId, { name: 'Updated Name' });
```

## Troubleshooting

### Connection Issues

- Verify your `DATABASE_URL` is correct in `.env.local`
- Ensure the URL includes `?sslmode=require`
- Check that your Neon project is active (not suspended)

### TypeScript Errors

If you see TypeScript errors after adding new tables:

1. Restart your TypeScript server in VS Code
2. Run `npm run dev` to rebuild

### Migration Conflicts

If you have migration conflicts:

```bash
# Drop the last migration
npm run db:drop

# Regenerate
npm run db:generate
```

## Resources

- [Drizzle ORM Documentation](https://orm.drizzle.team/docs/overview)
- [Neon Documentation](https://neon.tech/docs/introduction)
- [Drizzle Studio](https://orm.drizzle.team/drizzle-studio/overview)
