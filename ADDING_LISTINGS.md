# Quick Guide: Adding Listings to Your Garage Sale

## Step 1: Add Photos

1. Take clear photos of your items (mobile photos work great!)
2. Copy/move photos to `public/photos/` folder
3. Use simple names like:
   - `red-chair.jpg`
   - `kitchen-blender.jpg`
   - `book-collection.jpg`

## Step 2: Add Listing to Database

1. Go to your Supabase project: [supabase.com/dashboard](https://supabase.com/dashboard)
2. Click **Table Editor** → **listings**
3. Click **Insert row** → **Insert row** (green button)
4. Fill in the form:

| Field | Example | Required |
|-------|---------|----------|
| **title** | "Vintage Red Armchair" | ✅ Yes |
| **price** | 45.00 | ✅ Yes |
| **description** | "Comfortable vintage chair, some wear on armrests" | ❌ Optional |
| **category** | "Furniture" | ✅ Yes |
| **image_url** | `/photos/red-chair.jpg` | ✅ Yes |

5. Click **Save**
6. Your item will appear on the website immediately!

## Categories

Choose one of these for each item:
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

## Tips

- Price format: Use decimal numbers (e.g., `15.00` or `5.50`)
- Image URL: Always start with `/photos/` followed by your photo filename
- Descriptions are optional but help sell items!
- You can mark items as sold by checking the `sold` checkbox
