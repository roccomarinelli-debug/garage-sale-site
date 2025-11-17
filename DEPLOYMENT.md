# Deploying to Netlify

## Prerequisites

1. A GitHub account
2. A Netlify account (free tier works great)
3. Your Supabase database set up (see SETUP.md)

## Step 1: Push to GitHub

Your code should already be in a Git repository. If you haven't pushed it yet:

```bash
# Create a new repository on GitHub (don't initialize with README)
# Then run these commands:

git add .
git commit -m "Initial commit: Super Garage Sale website"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
git push -u origin main
```

## Step 2: Deploy to Netlify

### Option A: Using Netlify CLI (Recommended)

1. Install Netlify CLI:
```bash
npm install -g netlify-cli
```

2. Login to Netlify:
```bash
netlify login
```

3. Initialize Netlify in your project:
```bash
netlify init
```

4. Follow the prompts:
   - Create & configure a new site
   - Choose your team
   - Give your site a name (e.g., `super-garage-sale`)
   - Build command: `npm run build`
   - Publish directory: `.next`

5. Set environment variables:
```bash
netlify env:set NEXT_PUBLIC_SUPABASE_URL "your_supabase_url"
netlify env:set NEXT_PUBLIC_SUPABASE_ANON_KEY "your_supabase_anon_key"
```

6. Deploy:
```bash
netlify deploy --prod
```

### Option B: Using Netlify Dashboard

1. Go to [netlify.com](https://netlify.com) and log in
2. Click "Add new site" → "Import an existing project"
3. Choose "Deploy with GitHub"
4. Select your repository
5. Configure build settings:
   - **Build command**: `npm run build`
   - **Publish directory**: `.next`
   - **Framework**: Next.js
6. Add environment variables:
   - Go to "Site settings" → "Environment variables"
   - Add:
     - `NEXT_PUBLIC_SUPABASE_URL` = your Supabase URL
     - `NEXT_PUBLIC_SUPABASE_ANON_KEY` = your Supabase anon key
7. Click "Deploy site"

## Step 3: Get Your Site URL

After deployment, Netlify will give you a URL like:
`https://super-garage-sale.netlify.app`

You can customize this in Site settings → Domain management.

## Step 4: Create QR Code for Posters

1. Go to a QR code generator like:
   - [qr-code-generator.com](https://www.qr-code-generator.com/)
   - [qrcode-monkey.com](https://www.qrcode-monkey.com/)

2. Enter your Netlify URL

3. Customize the QR code:
   - Add colors
   - Add a logo (optional)
   - Increase size for better scanning

4. Download as PNG or SVG

5. Print your posters with:
   ```
   SUPER GARAGE SALE
   Great stuff, Great Prices

   Scan to browse items →
   [QR CODE HERE]

   [Date, Time, Address]
   ```

## Updating the Site

Whenever you add new listings or photos:

1. Add photos to `public/photos/`
2. Add listings in Supabase (see ADDING_LISTINGS.md)
3. Changes appear immediately - no need to redeploy!

To update the code:
```bash
git add .
git commit -m "Update website"
git push
```

Netlify will automatically rebuild and deploy.

## Custom Domain (Optional)

1. In Netlify: Site settings → Domain management
2. Click "Add custom domain"
3. Follow the instructions to configure your DNS

## Troubleshooting

### Build fails
- Check that environment variables are set in Netlify
- Make sure `.env.local` is in `.gitignore` (it should be by default)

### Site loads but shows error
- Verify Supabase credentials in Netlify environment variables
- Check Supabase Row Level Security policies are enabled

### Images don't load
- Make sure images are in `public/photos/`
- Verify image paths start with `/photos/` in the database
