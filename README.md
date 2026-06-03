# Recipe Manager

A full-stack recipe sharing platform built with Next.js 16, PostgreSQL, and NextAuth.js. Users can browse recipes publicly and create their own after signing up.

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript
- **Database:** PostgreSQL
- **ORM:** Drizzle ORM
- **Authentication:** NextAuth.js v5
- **Styling:** Tailwind CSS

## Features

- Browse all recipes without an account
- Filter recipes by category
- User registration and login with hashed passwords
- Create recipes with dynamic ingredient and direction fields
- Protected routes — recipe creation requires authentication
- User dashboard showing all created recipes

## Setup

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment variables

Create a `.env.local` file in the root:

```
DATABASE_URL=postgresql://postgres:YOUR_PASSWORD@localhost:5432/recipe_manager
NEXTAUTH_SECRET=your-secret-key
NEXTAUTH_URL=http://localhost:3000
```

Generate a secret with:
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

### 3. Set up the database

Create the database in PostgreSQL:
```sql
CREATE DATABASE recipe_manager;
```

Run migrations:
```bash
npm run db:generate
npm run db:migrate
```

Seed categories:
```bash
npm run db:seed
```

### 4. Start the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Project Structure

```
app/                  # Next.js pages (App Router)
  recipes/            # Recipe list and detail pages
  categories/         # Category browse and filter
  dashboard/          # User dashboard (protected)
  login/              # Login page
  signup/             # Registration page
  api/auth/           # NextAuth API route
components/           # Reusable React components
lib/
  db/                 # Drizzle schema, connection, seed
  actions/            # Server Actions
middleware.ts         # Route protection
auth.ts               # NextAuth configuration
```

## Known Issues

- Recipe editing not yet implemented
- No image upload support
