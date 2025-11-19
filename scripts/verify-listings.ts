import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

async function verify() {
  const { data, error } = await supabase
    .from('listings')
    .select('title, price, sold')
    .order('title');

  if (error) {
    console.error('Error:', error);
    return;
  }

  console.log(`\n📊 Total listings: ${data?.length}\n`);
  data?.forEach((item, i) => {
    console.log(`${i + 1}. ${item.title} - $${item.price} ${item.sold ? '(SOLD)' : ''}`);
  });
}

verify();
