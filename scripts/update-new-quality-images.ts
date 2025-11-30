import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const imageUpdates = [
  {
    title: 'Wanderer Camp Mattress (Queen Size)',
    images: ['/photos/camp_mattress.jpeg'],
    image_url: '/photos/camp_mattress.jpeg'
  },
  {
    title: 'Bosch Electric Chainsaw',
    images: ['/photos/chainsaw.jpeg'],
    image_url: '/photos/chainsaw.jpeg'
  },
  {
    title: 'Glass Vase',
    images: ['/photos/vase.jpeg'],
    image_url: '/photos/vase.jpeg'
  },
  {
    title: 'Beach Sand Shovel',
    images: ['/photos/sand_shovel.jpeg'],
    image_url: '/photos/sand_shovel.jpeg'
  },
  {
    title: 'Christmas Tree Holder',
    images: ['/photos/xmas_tree_stand.jpeg'],
    image_url: '/photos/xmas_tree_stand.jpeg'
  },
  {
    title: 'Dual Arm Monitor Holder',
    images: ['/photos/monitor_stand.jpeg'],
    image_url: '/photos/monitor_stand.jpeg'
  },
  {
    title: 'Camping Chairs (x2)',
    images: ['/photos/camp_chairs_new.jpeg'],
    image_url: '/photos/camp_chairs_new.jpeg'
  },
  {
    title: 'Super Cool Mushroom Grow Box',
    images: ['/photos/mushroom_box.jpeg'],
    image_url: '/photos/mushroom_box.jpeg'
  },
  {
    title: 'Bike Mechanic Stand',
    images: ['/photos/bike_stand.jpeg'],
    image_url: '/photos/bike_stand.jpeg'
  }
];

async function updateImages() {
  console.log('📸 Updating with new high-quality images...\n');

  for (const item of imageUpdates) {
    const { error } = await supabase
      .from('listings')
      .update({
        images: item.images,
        image_url: item.image_url
      })
      .eq('title', item.title);

    if (error) {
      console.error(`❌ Error updating ${item.title}:`, error);
    } else {
      console.log(`✅ Updated: ${item.title}`);
    }
  }

  console.log('\n✅ All images updated with new photos!');
  console.log('\n⚠️  Still missing photos for:');
  console.log('   - 12kg Kettlebells');
  console.log('   - 1m Spirit Level');
}

updateImages();
