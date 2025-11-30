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
    images: ['/photos/camp_sleeping_mat.jpeg'],
    image_url: '/photos/camp_sleeping_mat.jpeg'
  },
  {
    title: 'Bosch Electric Chainsaw',
    images: ['/photos/electric_chainsaw.jpeg'],
    image_url: '/photos/electric_chainsaw.jpeg'
  },
  {
    title: 'Glass Vase',
    images: ['/photos/glass_vase.jpeg'],
    image_url: '/photos/glass_vase.jpeg'
  },
  {
    title: 'Beach Sand Shovel',
    images: ['/photos/beach_shovel.jpeg'],
    image_url: '/photos/beach_shovel.jpeg'
  },
  {
    title: 'Christmas Tree Holder',
    images: ['/photos/christmas_tree_holder.jpeg'],
    image_url: '/photos/christmas_tree_holder.jpeg'
  },
  {
    title: 'Dual Arm Monitor Holder',
    images: ['/photos/dual_monitor_stand_for_desk.jpeg'],
    image_url: '/photos/dual_monitor_stand_for_desk.jpeg'
  },
  {
    title: 'Camping Chairs (x2)',
    images: ['/photos/camp_chairs.jpeg'],
    image_url: '/photos/camp_chairs.jpeg'
  }
];

async function updateImages() {
  console.log('📸 Updating to JPEG format...\n');

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

  console.log('\n✅ All image paths updated to JPEG format!');
}

updateImages();
