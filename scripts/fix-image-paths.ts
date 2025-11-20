import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const imageUpdates = [
  { title: 'BMX Bike', newPath: '/photos/BMX.jpeg' },
  { title: 'Box of Lego', newPath: '/photos/Box o leggo.jpeg' },
  { title: 'Childrens Bike', newPath: '/photos/Childrens Bike.jpeg' },
  { title: 'Wall Clock', newPath: '/photos/Clock.jpeg' },
  { title: 'Dehydrator', newPath: '/photos/Dehydrator.jpeg' },
  { title: 'Finska Game', newPath: '/photos/Finska Game.jpeg' },
  { title: 'High Table', newPath: '/photos/High Table.jpeg' },
  { title: 'Philips Sodastream', newPath: '/photos/Phillips Sodastream.jpeg' },
  { title: 'Push Up Bar', newPath: '/photos/Push Up bar.jpeg' },
  { title: 'Specialized BMX', newPath: '/photos/Specialized BMX.jpeg' },
  { title: 'Steam Vacuum', newPath: '/photos/Steam Vacuum.jpeg' },
  { title: 'Surfboards', newPath: '/photos/Surfboards.jpeg' },
  { title: 'Townie Bike', newPath: '/photos/Townie Bike.jpeg' },
  { title: 'Viper Bar', newPath: '/photos/Viper Bar.jpeg' }
];

async function fixImagePaths() {
  console.log('🔧 Fixing image paths for new listings...\n');

  for (const update of imageUpdates) {
    const { error } = await supabase
      .from('listings')
      .update({
        image_url: update.newPath,
        images: [update.newPath]
      })
      .eq('title', update.title);

    if (error) {
      console.error(`❌ Error updating ${update.title}:`, error);
    } else {
      console.log(`✅ Updated: ${update.title} -> ${update.newPath}`);
    }
  }

  console.log('\n✅ All image paths fixed!');
}

fixImagePaths();
