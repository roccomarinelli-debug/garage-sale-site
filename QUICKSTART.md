# Quick Start Guide

Your garage sale website is ready! Here's what to do next:

## 1. Set Up Supabase Database (5 minutes)

1. Go to [supabase.com](https://supabase.com) and sign up
2. Create a new project
3. Go to **SQL Editor** and run this query:

```sql
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

ALTER TABLE listings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read access" ON listings
  FOR SELECT USING (true);

CREATE POLICY "Allow authenticated insert" ON listings
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow authenticated update" ON listings
  FOR UPDATE USING (true);
```

4. Go to **Settings** → **API**
5. Copy your **Project URL** and **anon public** key
6. Create `.env.local` file:

```bash
cp .env.local.example .env.local
```

7. Paste your credentials into `.env.local`

## 2. Test Locally

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000)

The site will show an empty state until you add listings.

## 3. Add Your First Item

### Add a test photo:
- Put any image in `public/photos/` (e.g., `test-item.jpg`)

### Add a listing in Supabase:
1. Go to Supabase → **Table Editor** → **listings**
2. Click **Insert row**
3. Fill in:
   - title: "Test Item"
   - price: 10.00
   - description: "This is a test item"
   - category: "Other"
   - image_url: "/photos/test-item.jpg"
4. Save

Refresh your website - you should see the item!

## 4. Deploy to Netlify

### Option A: Using Netlify Dashboard (Easiest)

1. Go to [netlify.com](https://netlify.com)
2. Click "Add new site" → "Import an existing project"
3. Connect to GitHub and select `garage-sale-site`
4. Configure:
   - Build command: `npm run build`
   - Publish directory: `.next`
5. Add environment variables:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
6. Deploy!

### Option B: Using CLI

```bash
netlify init
# Follow the prompts to create a new site

# Set environment variables
netlify env:set NEXT_PUBLIC_SUPABASE_URL "your_url"
netlify env:set NEXT_PUBLIC_SUPABASE_ANON_KEY "your_key"

# Deploy
netlify deploy --prod
```

## 5. Create QR Code

1. Get your Netlify URL (e.g., `super-garage-sale.netlify.app`)
2. Go to [qr-code-generator.com](https://www.qr-code-generator.com/)
3. Enter your URL
4. Download the QR code
5. Add it to your posters!

## 6. Add Your Real Items

For each item:
1. Take a photo → save to `public/photos/`
2. Add listing in Supabase Table Editor

That's it! Your site updates automatically.

## Need Help?

- **Setup issues**: See [SETUP.md](./SETUP.md)
- **Adding listings**: See [ADDING_LISTINGS.md](./ADDING_LISTINGS.md)
- **Deployment**: See [DEPLOYMENT.md](./DEPLOYMENT.md)

## Your Repository

GitHub: https://github.com/roccomarinelli-debug/garage-sale-site

---

Happy selling!
