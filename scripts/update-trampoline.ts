import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

async function updateTrampoline() {
  console.log('🔄 Updating Trampoline listing...\n');

  const { error } = await supabase
    .from('listings')
    .update({
      title: 'Vuly XL Trampoline',
      description: 'Vuly XL trampoline, 470cm diameter. Large outdoor trampoline, great for kids'
    })
    .eq('title', 'Trampoline');

  if (error) {
    console.error('Error updating listing:', error);
  } else {
    console.log('✅ Updated: Trampoline → Vuly XL Trampoline (470cm)');
  }
}

updateTrampoline();
