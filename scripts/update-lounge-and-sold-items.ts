import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

async function updateListings() {
  console.log('📸 Updating lounge suite with new photos...\n');

  // Update lounge suite with all 10 photos
  const loungePhotos = [
    '/photos/Lounge Suite 1.jpeg',
    '/photos/Lounge Suite 2.jpeg',
    '/photos/Lounge Suite 3.jpeg',
    '/photos/Lounge Suite 4.jpeg',
    '/photos/Lounge Suite 5.jpeg',
    '/photos/Lounge Suite 6.jpeg',
    '/photos/Lounge 7.jpeg',
    '/photos/Lounge 8.jpeg',
    '/photos/Lounge 9.jpeg',
    '/photos/Lounge 10.jpeg',
  ];

  const { data: loungeSuite, error: loungeError } = await supabase
    .from('listings')
    .update({
      images: loungePhotos,
      image_url: loungePhotos[0],
    })
    .ilike('title', '%lounge%suite%')
    .select();

  if (loungeError) {
    console.error('❌ Error updating lounge suite:', loungeError);
  } else {
    console.log(`✅ Updated lounge suite with ${loungePhotos.length} photos`);
    console.log(`   ${loungeSuite?.[0]?.title}\n`);
  }

  // Mark sold items as sold
  console.log('🔴 Marking sold items...\n');

  const soldItems = [
    'drums',
    'playstation',
    'coffee table',
    'ikea chair',
    'surfboard',
  ];

  for (const item of soldItems) {
    const { data, error } = await supabase
      .from('listings')
      .update({ sold: true })
      .ilike('title', `%${item}%`)
      .select();

    if (error) {
      console.error(`❌ Error marking ${item} as sold:`, error);
    } else if (data && data.length > 0) {
      console.log(`✅ Marked as SOLD: ${data[0].title}`);
    } else {
      console.log(`⚠️  Could not find listing for: ${item}`);
    }
  }

  console.log('\n✨ All updates complete!');
}

updateListings();
