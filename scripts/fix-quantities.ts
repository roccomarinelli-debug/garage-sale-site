import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

async function fixQuantities() {
  console.log('🔄 Fixing quantities...\n');

  // Delete the duplicate listings
  const { error: deleteStoolsError } = await supabase
    .from('listings')
    .delete()
    .in('title', ['Ikea Stool #2', 'Ikea Stool #3']);

  if (deleteStoolsError) {
    console.error('Error deleting duplicate stools:', deleteStoolsError);
  } else {
    console.log('✅ Deleted: Ikea Stool #2 and #3');
  }

  const { error: deleteChairError } = await supabase
    .from('listings')
    .delete()
    .eq('title', 'Ikea Chair #2');

  if (deleteChairError) {
    console.error('Error deleting duplicate chair:', deleteChairError);
  } else {
    console.log('✅ Deleted: Ikea Chair #2');
  }

  // Update the original listings to show quantity
  const { error: updateStoolError } = await supabase
    .from('listings')
    .update({ title: 'Ikea Stool (x3 available)' })
    .eq('title', 'Ikea Stool');

  if (updateStoolError) {
    console.error('Error updating stool:', updateStoolError);
  } else {
    console.log('✅ Updated: Ikea Stool → Ikea Stool (x3 available)');
  }

  const { error: updateChairError } = await supabase
    .from('listings')
    .update({ title: 'Ikea Chair (x2 available)' })
    .eq('title', 'Ikea Chair');

  if (updateChairError) {
    console.error('Error updating chair:', updateChairError);
  } else {
    console.log('✅ Updated: Ikea Chair → Ikea Chair (x2 available)');
  }

  console.log('\n✅ All fixed! Now showing quantities in single listings.');
}

fixQuantities();
