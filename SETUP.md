# Garage Sale Website Setup Guide

## 1. Supabase Setup

### Create a Supabase Project
1. Go to [supabase.com](https://supabase.com) and create a free account
2. Create a new project
3. Wait for the database to be provisioned

### Get Your Credentials
1. In your Supabase project dashboard, go to **Settings** → **API**
2. Copy the **Project URL** and **anon public** key
3. Create a `.env.local` file in the project root:
   ```bash
   cp .env.local.example .env.local
   ```
4. Add your credentials to `.env.local`

### Create the Database Table
1. In Supabase dashboard, go to **SQL Editor**
2. Create a new query and run this SQL:

```sql
-- Create listings table
CREATE TABLE listings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  price NUMERIC(10, 2) NOT NULL,
  description TEXT,
  category TEXT NOT NULL,
  image_url TEXT NOT NULL,
  sold BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Enable Row Level Security
ALTER TABLE listings ENABLE ROW LEVEL SECURITY;

-- Create policy to allow public read access
CREATE POLICY "Allow public read access" ON listings
  FOR SELECT
  USING (true);

-- Create policy to allow authenticated insert/update (optional for admin)
CREATE POLICY "Allow authenticated insert" ON listings
  FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Allow authenticated update" ON listings
  FOR UPDATE
  USING (true);

-- Create index for faster queries
CREATE INDEX idx_listings_category ON listings(category);
CREATE INDEX idx_listings_created_at ON listings(created_at DESC);
```

## 2. Adding Photos

1. Place all item photos in the `public/photos/` folder
2. Name them descriptively (e.g., `vintage-lamp.jpg`, `leather-couch.jpg`)
3. Supported formats: JPG, PNG, WEBP, GIF

## 3. Adding Listings

You can add listings in two ways:

### Option A: Using Supabase Dashboard (Easiest)
1. Go to **Table Editor** → **listings**
2. Click **Insert row**
3. Fill in the fields:
   - `title`: Item name
   - `price`: Price in dollars (e.g., 25.00)
   - `description`: Optional description
   - `category`: Choose from the available categories
   - `image_url`: `/photos/your-image.jpg`

### Option B: Using SQL
```sql
INSERT INTO listings (title, price, description, category, image_url)
VALUES (
  'Vintage Desk Lamp',
  25.00,
  'Beautiful brass desk lamp from the 1960s. Works perfectly!',
  'Furniture',
  '/photos/vintage-lamp.jpg'
);
```

## 4. Running Locally

```bash
npm install
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000)

## 5. Deploy to Netlify

See `DEPLOYMENT.md` for deployment instructions.
