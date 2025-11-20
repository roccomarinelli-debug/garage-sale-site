import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

async function setAvailableDate() {
  console.log('📅 Setting available date for BMX Bike...\n');

  const { error } = await supabase
    .from('listings')
    .update({
      available_date: '2025-12-20'
    })
    .eq('title', 'BMX Bike');

  if (error) {
    console.error('❌ Error updating BMX Bike:', error);
  } else {
    console.log('✅ BMX Bike will show "Available 20 Dec" badge');
  }
}

setAvailableDate();
