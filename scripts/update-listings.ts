import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

async function updateListings() {
  console.log('🔄 Updating listings...\n');

  // 1. Delete duplicate "Stand up Desk" (keep "Standup Desk")
  const { error: deleteError } = await supabase
    .from('listings')
    .delete()
    .eq('title', 'Stand up Desk');

  if (deleteError) console.error('Error deleting Stand up Desk:', deleteError);
  else console.log('✅ Deleted duplicate: Stand up Desk');

  // 2. Update prices
  const updates = [
    { title: 'Coffee Table', price: 50.00 },
    { title: 'Ikea Daybed', price: 150.00 },
    { title: 'Ikea Stool', price: 20.00 },
    { title: 'Ikea Chair', price: 15.00 },
    { title: 'Electric Drum Kit', price: 70.00, description: 'Full electronic drum kit with headphone jack, perfect for practice. From Aldi' },
    { title: 'Long Coffee Table', price: 50.00 },
    { title: 'Bunk Bed', price: 150.00 },
    { title: 'Bosch Washing Machine', price: 750.00, description: 'Bosch Serie 8 (2018) washing machine, works perfectly, front loader, excellent condition' },
    { title: 'Bosch Dryer', price: 600.00, description: 'Bosch Serie 6 (2019) dryer, energy efficient, barely used, excellent condition' },
  ];

  for (const update of updates) {
    const { error } = await supabase
      .from('listings')
      .update({
        price: update.price,
        ...(update.description && { description: update.description })
      })
      .eq('title', update.title);

    if (error) console.error(`Error updating ${update.title}:`, error);
    else console.log(`✅ Updated: ${update.title} → $${update.price}`);
  }

  // 3. Get existing Ikea Stool and Chair to duplicate
  const { data: stool } = await supabase
    .from('listings')
    .select('*')
    .eq('title', 'Ikea Stool')
    .single();

  const { data: chair } = await supabase
    .from('listings')
    .select('*')
    .eq('title', 'Ikea Chair')
    .single();

  // 4. Create additional Ikea Stools (x2 more, for total of 3)
  if (stool) {
    for (let i = 2; i <= 3; i++) {
      const { error } = await supabase.from('listings').insert({
        title: `Ikea Stool #${i}`,
        price: 20.00,
        description: stool.description,
        category: stool.category,
        images: stool.images,
        image_url: stool.image_url,
        sold: false,
      });
      if (!error) console.log(`✅ Added: Ikea Stool #${i}`);
    }
  }

  // 5. Create additional Ikea Chair (x1 more, for total of 2)
  if (chair) {
    const { error } = await supabase.from('listings').insert({
      title: 'Ikea Chair #2',
      price: 15.00,
      description: chair.description,
      category: chair.category,
      images: chair.images,
      image_url: chair.image_url,
      sold: false,
    });
    if (!error) console.log('✅ Added: Ikea Chair #2');
  }

  console.log('\n✅ All updates complete!');
}

updateListings();
