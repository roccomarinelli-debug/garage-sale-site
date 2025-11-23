import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const categoryUpdates = [
  { title: 'Viper Bar', category: 'Sports & Outdoors' },
  { title: 'Townie Bike', category: 'Sports & Outdoors' },
  { title: 'Surfboards', category: 'Sports & Outdoors' },
  { title: 'Steam Vacuum', category: 'Electronics' },
  { title: 'Specialized BMX', category: 'Sports & Outdoors' },
  { title: 'Push Up Bar', category: 'Sports & Outdoors' },
  { title: 'Philips Sodastream', category: 'Kitchen & Appliances' },
  { title: 'High Table', category: 'Furniture' },
  { title: 'Finska Game', category: 'Toys & Games' },
  { title: 'Dehydrator', category: 'Kitchen & Appliances' },
  { title: 'Wall Clock', category: 'Furniture' },
  { title: 'Childrens Bike', category: 'Sports & Outdoors' },
  { title: 'Box of Lego', category: 'Toys & Games' },
  { title: 'BMX Bike', category: 'Sports & Outdoors' },
  { title: 'Vuly XL Trampoline', category: 'Sports & Outdoors' },
  { title: 'PlayStation 3', category: 'Electronics' },
  { title: 'LED Spotlight (x2)', category: 'Electronics' },
  { title: 'Lamp', category: 'Furniture' },
  { title: 'Kids Kayak', category: 'Sports & Outdoors' },
  { title: 'Standup Desk', category: 'Furniture' },
  { title: 'Wicker Lounge', category: 'Furniture' },
  { title: 'Coffee Table', category: 'Furniture' },
  { title: 'IKEA Storage Unit', category: 'Furniture' },
  { title: 'IKEA Daybed', category: 'Furniture' },
  { title: 'IKEA Chair', category: 'Furniture' },
  { title: 'Electric Drum Kit', category: 'Electronics' }
];

async function updateCategories() {
  console.log('🏷️  Updating categories for all listings...\n');

  for (const update of categoryUpdates) {
    const { error } = await supabase
      .from('listings')
      .update({ category: update.category })
      .eq('title', update.title);

    if (error) {
      console.error(`❌ Error updating ${update.title}:`, error);
    } else {
      console.log(`✅ ${update.title} → ${update.category}`);
    }
  }

  console.log('\n✅ All categories updated!');
}

updateCategories();
