import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

async function makeItemsFree() {
  console.log('🎁 Making vase and Finska game FREE...\n');

  const itemsToFree = ['Glass Vase', 'Finska Game'];

  for (const title of itemsToFree) {
    const { error } = await supabase
      .from('listings')
      .update({ price: 0 })
      .eq('title', title);

    if (error) {
      console.error(`❌ Error updating ${title}:`, error);
    } else {
      console.log(`✅ Made FREE: ${title}`);
    }
  }
}

async function reorderListings() {
  console.log('\n📊 Reordering listings strategically...\n');

  // Strategic order: expensive items at top, cheaper peppered throughout
  // FREE items dispersed (max 1 per row of 3)
  const strategicOrder = [
    // Row 1: High-value items
    'Lounge Suite',              // $650
    'Bosch Washing Machine',     // $700
    'Bosch Dryer',               // $650

    // Row 2: Mix high and mid
    'Standup Desk',              // $280
    'Trampoline',                // $250
    'Beach Sand Shovel',         // FREE - dispersed

    // Row 3: Mid-value items
    'Ikea Daybed',               // $150
    'Bunk Bed',                  // $150
    'Wanderer Camp Mattress (Queen Size)', // $50

    // Row 4: Mix
    'High Table',                // $80
    'Steam Vacuum',              // $80
    'Camping Chairs (x2)',       // FREE - dispersed

    // Row 5: Lower items
    'Electric Drum Kit',         // $70
    'PlayStation 3',             // $25
    'Glass Vase',                // FREE - dispersed

    // Row 6: Mix
    'Long Coffee Table',         // $50
    'Coffee Table',              // $50
    'Specialized BMX',           // $150

    // Row 7: Mix
    'Townie Bike',               // $120
    'Dehydrator',                // $40
    'Finska Game',               // FREE - dispersed

    // Row 8: Smaller items
    'Philips Sodastream',        // $30
    'Lamp',                      // $30
    'Bosch Electric Chainsaw',   // $25

    // Row 9: Mix
    'Christmas Tree Holder',     // $10
    'Childrens Bike',            // $40
    'Ikea Stool (x3 available)', // $20

    // Row 10+: Remaining items
    'Ikea Chair (x2 available)', // $15
    'Wall Clock',                // $15
    'Push Up Bar',               // $15
    'BMX Bike',                  // $50
    'Kids Kayak',                // $50
    'LED Spotlight (x2)',        // $70
    'Surfboards',                // $200
    'Bike Mechanic Stand',       // $20
    'Dual Arm Monitor Holder',   // $10
    'Super Cool Mushroom Grow Box', // $50
  ];

  for (let i = 0; i < strategicOrder.length; i++) {
    const { error } = await supabase
      .from('listings')
      .update({ display_order: i })
      .eq('title', strategicOrder[i]);

    if (error) {
      console.error(`❌ Error updating order for ${strategicOrder[i]}:`, error);
    } else {
      console.log(`✅ Position ${i + 1}: ${strategicOrder[i]}`);
    }
  }

  console.log('\n✅ All listings reordered!');
}

async function run() {
  await makeItemsFree();
  await reorderListings();
}

run();
