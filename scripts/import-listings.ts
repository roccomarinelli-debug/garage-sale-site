import fs from 'fs';
import path from 'path';
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Error: Missing Supabase credentials in .env.local');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function importListings() {
  const templatePath = path.join(process.cwd(), 'listings-template.json');

  if (!fs.existsSync(templatePath)) {
    console.error('❌ Error: listings-template.json not found!');
    console.log('Run: npm run generate-template');
    process.exit(1);
  }

  const listings = JSON.parse(fs.readFileSync(templatePath, 'utf-8'));

  console.log(`📦 Importing ${listings.length} listings...`);

  let successCount = 0;
  let errorCount = 0;

  for (const listing of listings) {
    try {
      // Validate required fields
      if (!listing.title || listing.price === 0) {
        console.warn(`⚠️  Skipping "${listing.title}" - missing title or price is 0`);
        continue;
      }

      // Set image_url to first image for backward compatibility
      const dataToInsert = {
        ...listing,
        image_url: listing.images[0],
      };

      const { error } = await supabase
        .from('listings')
        .insert([dataToInsert]);

      if (error) throw error;

      console.log(`✅ Imported: ${listing.title}`);
      successCount++;
    } catch (error) {
      console.error(`❌ Failed to import "${listing.title}":`, error);
      errorCount++;
    }
  }

  console.log('\n📊 Import Summary:');
  console.log(`  ✅ Successfully imported: ${successCount}`);
  console.log(`  ❌ Failed: ${errorCount}`);
  console.log(`  ⏭️  Skipped: ${listings.length - successCount - errorCount}`);
}

importListings();
