import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

async function checkAndFixDuplicates() {
  console.log('🔍 Checking for duplicates...\n');

  // Get all listings
  const { data: listings, error } = await supabase
    .from('listings')
    .select('*')
    .order('created_at', { ascending: true });

  if (error) {
    console.error('Error fetching listings:', error);
    return;
  }

  console.log('Current listings:');
  listings?.forEach((listing, i) => {
    console.log(`  ${i + 1}. ${listing.title} (created: ${new Date(listing.created_at).toLocaleString()})`);
  });

  // Find Ikea items
  const ikeaChairs = listings?.filter(l =>
    l.title.toLowerCase().includes('ikea') && l.title.toLowerCase().includes('chair')
  );
  const ikeaStools = listings?.filter(l =>
    l.title.toLowerCase().includes('ikea') && l.title.toLowerCase().includes('stool')
  );

  console.log(`\n📊 Found ${ikeaChairs?.length} Ikea Chair listings`);
  console.log(`📊 Found ${ikeaStools?.length} Ikea Stool listings`);

  // Delete all duplicates and keep only one with proper naming
  if (ikeaChairs && ikeaChairs.length > 1) {
    console.log('\n🗑️  Removing duplicate Ikea Chairs...');
    // Delete all
    for (const chair of ikeaChairs) {
      await supabase.from('listings').delete().eq('id', chair.id);
      console.log(`   Deleted: ${chair.title}`);
    }
    // Re-create single listing
    const { error: insertError } = await supabase.from('listings').insert({
      title: 'Ikea Chair (x2 available)',
      price: 15.00,
      description: 'Comfortable Ikea dining chair, modern design. 2 available at $15 each.',
      category: 'Furniture',
      images: ikeaChairs[0].images,
      image_url: ikeaChairs[0].image_url,
      sold: false,
    });
    if (!insertError) console.log('   ✅ Created: Ikea Chair (x2 available)');
  }

  if (ikeaStools && ikeaStools.length > 1) {
    console.log('\n🗑️  Removing duplicate Ikea Stools...');
    // Delete all
    for (const stool of ikeaStools) {
      await supabase.from('listings').delete().eq('id', stool.id);
      console.log(`   Deleted: ${stool.title}`);
    }
    // Re-create single listing
    const { error: insertError } = await supabase.from('listings').insert({
      title: 'Ikea Stool (x3 available)',
      price: 20.00,
      description: 'Simple Ikea stool, perfect for kitchen or bar. 3 available at $20 each.',
      category: 'Furniture',
      images: ikeaStools[0].images,
      image_url: ikeaStools[0].image_url,
      sold: false,
    });
    if (!insertError) console.log('   ✅ Created: Ikea Stool (x3 available)');
  }

  console.log('\n✅ Cleanup complete!');
}

checkAndFixDuplicates();
