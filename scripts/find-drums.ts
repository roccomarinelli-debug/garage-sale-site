import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

async function findDrums() {
  const { data } = await supabase
    .from('listings')
    .select('id, title, sold')
    .or('title.ilike.%drum%,title.ilike.%percussion%');

  console.log(JSON.stringify(data, null, 2));
}

findDrums();
