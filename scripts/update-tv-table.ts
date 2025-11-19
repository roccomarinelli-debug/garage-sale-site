import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

async function updateTVTable() {
  console.log('🔄 Updating Coffee Table to TV Bench...\n');

  const { error } = await supabase
    .from('listings')
    .update({
      title: 'Ikea TV Bench',
      description: 'Ikea TV bench/table, modern design with storage, perfect for living room'
    })
    .eq('title', 'Coffee Table');

  if (error) {
    console.error('Error updating listing:', error);
  } else {
    console.log('✅ Updated: Coffee Table → Ikea TV Bench');
  }
}

updateTVTable();
