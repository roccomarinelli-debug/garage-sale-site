# Super Garage Sale Website

A beautiful, mobile-optimized garage sale website built with Next.js, TypeScript, and Supabase. Perfect for showcasing items with QR code access for easy browsing.

## Features

- 📱 **Mobile-First Design** - Optimized for phones and tablets
- 🏷️ **Category Filtering** - Easy browsing by category
- 🖼️ **Image Gallery** - Beautiful photo displays
- 💰 **Price Display** - Clear pricing for all items
- ⚡ **Fast & Responsive** - Built with Next.js for speed
- 🔄 **Real-time Updates** - Powered by Supabase
- 📊 **Sold Tracking** - Mark items as sold

## Tech Stack

- **Next.js 14** - React framework with App Router
- **TypeScript** - Type safety
- **Tailwind CSS** - Beautiful, responsive styling
- **Supabase** - Database and backend
- **Netlify** - Hosting and deployment

## Quick Start

### 1. Clone and Install

```bash
git clone <your-repo-url>
cd garage-sale-site
npm install
```

### 2. Set Up Supabase

Follow the instructions in [SETUP.md](./SETUP.md) to:
- Create a Supabase project
- Set up the database
- Get your credentials

### 3. Configure Environment

```bash
cp .env.local.example .env.local
```

Edit `.env.local` with your Supabase credentials.

### 4. Run Locally

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000)

## Adding Items

See [ADDING_LISTINGS.md](./ADDING_LISTINGS.md) for detailed instructions on:
- Adding photos
- Creating listings
- Managing categories

## Deployment

See [DEPLOYMENT.md](./DEPLOYMENT.md) for instructions on:
- Deploying to Netlify
- Setting up GitHub
- Creating QR codes for posters

## Project Structure

```
garage-sale-site/
├── app/
│   ├── layout.tsx          # Root layout with metadata
│   └── page.tsx            # Main listing page
├── components/
│   ├── ListingCard.tsx     # Individual item card
│   └── CategoryFilter.tsx  # Category filter buttons
├── lib/
│   └── supabase.ts         # Supabase client config
├── types/
│   └── listing.ts          # TypeScript types
├── public/
│   └── photos/             # 📸 Put your item photos here!
├── SETUP.md                # Setup instructions
├── ADDING_LISTINGS.md      # Guide for adding items
└── DEPLOYMENT.md           # Deployment guide
```

## Categories

- Electronics
- Furniture
- Clothing
- Books
- Toys
- Kitchen
- Sports
- Garden
- Tools
- Other

## License

Free to use for your garage sale!

---

Built with ❤️ for awesome garage sales
