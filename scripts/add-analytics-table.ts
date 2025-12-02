import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import fs from 'fs';

dotenv.config({ path: '.env.local' });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

async function runMigration() {
  console.log('📊 Adding analytics table...\n');

  const migration = fs.readFileSync(
    './supabase/migrations/20251202000000_add_analytics.sql',
    'utf8'
  );

  const { error } = await supabase.rpc('exec_sql', { sql: migration });

  if (error) {
    console.error('❌ Error running migration:', error);
  } else {
    console.log('✅ Analytics table created successfully!');
  }
}

runMigration();
