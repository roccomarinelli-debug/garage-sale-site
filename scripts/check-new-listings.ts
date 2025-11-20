import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

async function checkNewListings() {
  const titles = [
    'BMX Bike',
    'Box of Lego',
    'Childrens Bike',
    'Wall Clock',
    'Dehydrator',
    'Finska Game',
    'High Table',
    'Philips Sodastream',
    'Push Up Bar',
    'Specialized BMX',
    'Steam Vacuum',
    'Surfboards',
    'Townie Bike',
    'Viper Bar'
  ];

  console.log('🔍 Checking new listings in database...\n');

  for (const title of titles) {
    const { data, error } = await supabase
      .from('listings')
      .select('title, image_url, images')
      .eq('title', title)
      .single();

    if (error) {
      console.error(`❌ Error fetching ${title}:`, error);
    } else {
      console.log(`${title}:`);
      console.log(`  image_url: ${data.image_url}`);
      console.log(`  images: ${JSON.stringify(data.images)}`);
      console.log('');
    }
  }
}

checkNewListings();
