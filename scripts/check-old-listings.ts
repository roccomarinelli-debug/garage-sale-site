import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

async function checkOldListings() {
  console.log('🔍 Checking existing working listings...\n');

  const { data, error } = await supabase
    .from('listings')
    .select('title, image_url, images')
    .limit(5);

  if (error) {
    console.error('Error:', error);
  } else {
    data?.forEach(listing => {
      console.log(`${listing.title}:`);
      console.log(`  image_url: ${listing.image_url}`);
      console.log(`  images: ${JSON.stringify(listing.images)}`);
      console.log('');
    });
  }
}

checkOldListings();
