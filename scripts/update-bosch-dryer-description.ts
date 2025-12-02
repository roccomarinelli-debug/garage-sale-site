import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

async function updateDescription() {
  console.log('📝 Updating Bosch dryer description...\n');

  const { error } = await supabase
    .from('listings')
    .update({
      description: 'Bosch Serie 6 WTW85460AU 9kg heat pump dryer (2019, based on FD 9709 serial: 2000s decade, 2009+20=2019 year)'
    })
    .eq('title', 'Bosch Dryer');

  if (error) {
    console.error('❌ Error updating Bosch Dryer:', error);
  } else {
    console.log('✅ Updated Bosch Dryer description');
  }
}

updateDescription();
