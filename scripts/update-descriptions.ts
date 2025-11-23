import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

async function updateDescriptions() {
  console.log('🔄 Updating item descriptions...\n');

  const updates = [
    {
      title: 'Specialized Bike',
      description: 'Renovators delight'
    },
    {
      title: 'Push-Up Bar',
      description: 'Used for calisthenics'
    },
    {
      title: 'Antique Clock',
      description: 'Antique clock'
    },
    {
      title: 'BMX Bike',
      description: 'We The People brand'
    },
    {
      title: 'Trampoline',
      description: 'Sunshade included'
    },
    {
      title: 'Standup Desk',
      description: 'Electric sit stand'
    }
  ];

  for (const update of updates) {
    const { error } = await supabase
      .from('listings')
      .update({ description: update.description })
      .eq('title', update.title);

    if (error) {
      console.error(`❌ Error updating ${update.title}:`, error);
    } else {
      console.log(`✅ Updated: ${update.title} → "${update.description}"`);
    }
  }

  console.log('\n✅ Description updates complete!');
}

updateDescriptions();
