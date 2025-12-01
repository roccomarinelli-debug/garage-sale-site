import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const listingsToDelete = [
  '12kg Kettlebells',
  '1m Spirit Level'
];

async function deleteListings() {
  console.log('🗑️  Deleting unwanted listings...\n');

  for (const title of listingsToDelete) {
    const { error } = await supabase
      .from('listings')
      .delete()
      .eq('title', title);

    if (error) {
      console.error(`❌ Error deleting ${title}:`, error);
    } else {
      console.log(`✅ Deleted: ${title}`);
    }
  }

  console.log('\n✅ Listings removed permanently!');
}

deleteListings();
