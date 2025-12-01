import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const priceUpdates = [
  { title: 'Bosch Washing Machine', price: 700.00 },
  { title: 'Bosch Dryer', price: 650.00 }
];

async function updatePrices() {
  console.log('💰 Updating Bosch appliance prices based on market research...\n');

  for (const item of priceUpdates) {
    const { error } = await supabase
      .from('listings')
      .update({ price: item.price })
      .eq('title', item.title);

    if (error) {
      console.error(`❌ Error updating ${item.title}:`, error);
    } else {
      console.log(`✅ Updated: ${item.title} - $${item.price.toFixed(2)}`);
    }
  }

  console.log('\n✅ Prices updated to competitive market rates!');
}

updatePrices();
