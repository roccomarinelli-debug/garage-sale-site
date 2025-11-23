import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

async function updateAvailabilityDates() {
  console.log('📅 Updating availability dates...\n');

  // Items that should have "Available 20 Dec" badge
  const itemsWithDate = [
    'BMX Bike',
    'Childrens Bike',
    'Wicker Lounge',
    'Bosch Washing Machine',
    'Bosch Dryer'
  ];

  // Set availability date for specified items
  for (const title of itemsWithDate) {
    const { error } = await supabase
      .from('listings')
      .update({ available_date: '2025-12-20' })
      .eq('title', title);

    if (error) {
      console.error(`❌ Error updating ${title}:`, error);
    } else {
      console.log(`✅ ${title} - will show "Available 20 Dec" badge`);
    }
  }

  // Remove availability date from Electric Drum Kit (if it has one)
  const { error: drumError } = await supabase
    .from('listings')
    .update({ available_date: null })
    .eq('title', 'Electric Drum Kit');

  if (drumError) {
    console.error('❌ Error updating Electric Drum Kit:', drumError);
  } else {
    console.log('✅ Electric Drum Kit - badge removed');
  }

  console.log('\n✅ All availability dates updated!');
}

updateAvailabilityDates();
