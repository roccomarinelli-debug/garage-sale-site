import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

async function markLegoFree() {
  console.log('🔄 Marking Lego as free...\n');

  const { error } = await supabase
    .from('listings')
    .update({
      price: 0,
      description: 'Large box of assorted Lego pieces - FREE!'
    })
    .eq('title', 'Box of Lego');

  if (error) {
    console.error('Error updating Box of Lego:', error);
  } else {
    console.log('✅ Updated: Box of Lego → FREE (price: $0)');
  }

  console.log('\n✅ Update complete!');
}

markLegoFree();
