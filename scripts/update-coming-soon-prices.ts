import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const priceUpdates = [
  { title: '12kg Kettlebells', price: 10.00 },
  { title: 'Bike Mechanic Stand', price: 20.00 },
  { title: 'Dual Arm Monitor Holder', price: 10.00 },
  { title: '1m Spirit Level', price: 25.00 },
  { title: 'Camping Chairs (x2)', price: 0 }, // FREE
  { title: 'Beach Sand Shovel', price: 0 }, // FREE
  { title: 'Wanderer Camp Mattress (Queen Size)', price: 50.00 },
  { title: 'Bosch Electric Chainsaw', price: 25.00 },
  { title: 'Glass Vase', price: 5.00 },
  { title: 'Super Cool Mushroom Grow Box', price: 50.00 }
  // Christmas Tree Holder already set to $10
];

async function updatePrices() {
  console.log('💰 Updating prices for coming soon listings...\n');

  for (const item of priceUpdates) {
    const { error } = await supabase
      .from('listings')
      .update({ price: item.price })
      .eq('title', item.title);

    if (error) {
      console.error(`❌ Error updating ${item.title}:`, error);
    } else {
      const priceDisplay = item.price === 0 ? 'FREE' : `$${item.price.toFixed(2)}`;
      console.log(`✅ Updated: ${item.title} - ${priceDisplay}`);
    }
  }

  console.log('\n✅ All prices updated!');
}

updatePrices();
