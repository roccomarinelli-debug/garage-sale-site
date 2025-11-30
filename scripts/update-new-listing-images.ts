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
    images: ['/photos/camp sleeping mat.png'],
    image_url: '/photos/camp sleeping mat.png'
  },
  {
    title: 'Bosch Electric Chainsaw',
    images: ['/photos/electric chainsaw.png'],
    image_url: '/photos/electric chainsaw.png'
  },
  {
    title: 'Glass Vase',
    images: ['/photos/glass vase.png'],
    image_url: '/photos/glass vase.png'
  },
  {
    title: 'Beach Sand Shovel',
    images: ['/photos/beach shovel.png'],
    image_url: '/photos/beach shovel.png'
  },
  {
    title: 'Christmas Tree Holder',
    images: ['/photos/christmas tree holder.png'],
    image_url: '/photos/christmas tree holder.png'
  },
  {
    title: 'Dual Arm Monitor Holder',
    images: ['/photos/dual monitor stand for desk.png'],
    image_url: '/photos/dual monitor stand for desk.png'
  },
  {
    title: 'Camping Chairs (x2)',
    images: ['/photos/camp_chairs.jpeg'],
    image_url: '/photos/camp_chairs.jpeg'
  }
];

async function updateImages() {
  console.log('📸 Updating images for coming soon listings...\n');

  for (const item of imageUpdates) {
    const { error } = await supabase
      .from('listings')
      .update({
        images: item.images,
        image_url: item.image_url,
        available_date: null // Remove the "coming soon" date since we now have photos
      })
      .eq('title', item.title);

    if (error) {
      console.error(`❌ Error updating ${item.title}:`, error);
    } else {
      console.log(`✅ Updated: ${item.title}`);
    }
  }

  console.log('\n✅ All images updated! Photos are now live on the site.');
  console.log('\n⚠️  Still need photos for:');
  console.log('   - 12kg Kettlebells');
  console.log('   - Bike Mechanic Stand');
  console.log('   - 1m Spirit Level');
  console.log('   - Super Cool Mushroom Grow Box');
}

updateImages();
