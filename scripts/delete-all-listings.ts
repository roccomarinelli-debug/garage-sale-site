import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

async function deleteAll() {
  const { data } = await supabase.from('listings').select('id');
  console.log(`Found ${data?.length || 0} listings to delete...`);

  if (data && data.length > 0) {
    for (const item of data) {
      const { error } = await supabase
        .from('listings')
        .delete()
        .eq('id', item.id);

      if (error) {
        console.error(`Error deleting ${item.id}:`, error);
      }
    }
    console.log('✅ All listings deleted');
  } else {
    console.log('No listings to delete');
  }
}

deleteAll();
