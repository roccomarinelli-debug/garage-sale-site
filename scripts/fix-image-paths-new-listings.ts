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
    images: ['/photos/camp_sleeping_mat.png'],
    image_url: '/photos/camp_sleeping_mat.png'
  },
  {
    title: 'Bosch Electric Chainsaw',
    images: ['/photos/electric_chainsaw.png'],
    image_url: '/photos/electric_chainsaw.png'
  },
  {
    title: 'Glass Vase',
    images: ['/photos/glass_vase.png'],
    image_url: '/photos/glass_vase.png'
  },
  {
    title: 'Beach Sand Shovel',
    images: ['/photos/beach_shovel.png'],
    image_url: '/photos/beach_shovel.png'
  },
  {
    title: 'Christmas Tree Holder',
    images: ['/photos/christmas_tree_holder.png'],
    image_url: '/photos/christmas_tree_holder.png'
  },
  {
    title: 'Dual Arm Monitor Holder',
    images: ['/photos/dual_monitor_stand_for_desk.png'],
    image_url: '/photos/dual_monitor_stand_for_desk.png'
  },
  {
    title: 'Camping Chairs (x2)',
    images: ['/photos/camp_chairs.jpeg'],
    image_url: '/photos/camp_chairs.jpeg'
  }
];

async function updateImages() {
  console.log('📸 Fixing image paths (removing spaces)...\n');

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
      console.log(`✅ Fixed: ${item.title}`);
    }
  }

  console.log('\n✅ All image paths fixed! Images should now load correctly.');
}

updateImages();
