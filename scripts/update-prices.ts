import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

async function updatePrices() {
  console.log('🔄 Updating prices...\n');

  // Update Lamp to $10
  const { error: lampError } = await supabase
    .from('listings')
    .update({ price: 10.00 })
    .eq('title', 'Lamp');

  if (lampError) {
    console.error('Error updating Lamp:', lampError);
  } else {
    console.log('✅ Updated: Lamp → $10');
  }

  // Update Standup Desk to $90
  const { error: deskError } = await supabase
    .from('listings')
    .update({ price: 90.00 })
    .eq('title', 'Standup Desk');

  if (deskError) {
    console.error('Error updating Standup Desk:', deskError);
  } else {
    console.log('✅ Updated: Standup Desk → $90');
  }

  console.log('\n✅ Price updates complete!');
}

updatePrices();
