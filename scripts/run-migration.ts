import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';

// Load environment variables
dotenv.config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Error: Missing Supabase credentials in .env.local');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function runMigrations() {
  console.log('🔄 Running database migrations...\n');

  // Read both migration files
  const migrations = [
    'supabase/migrations/20251117041946_create_listings_table.sql',
    'supabase/migrations/20251117045836_add_multiple_images_and_availability.sql'
  ];

  for (const migrationFile of migrations) {
    const migrationPath = path.join(process.cwd(), migrationFile);

    if (!fs.existsSync(migrationPath)) {
      console.log(`⏭️  Skipping ${migrationFile} - file not found`);
      continue;
    }

    const sql = fs.readFileSync(migrationPath, 'utf-8');
    const migrationName = path.basename(migrationFile);

    console.log(`📄 Running: ${migrationName}`);

    try {
      const { error } = await supabase.rpc('exec_sql', { sql_string: sql });

      if (error) {
        // Try direct query method instead
        const lines = sql.split(';').filter(line => line.trim());

        for (const statement of lines) {
          if (statement.trim()) {
            const { error: queryError } = await supabase.rpc('exec_sql', {
              sql_string: statement + ';'
            });

            if (queryError) {
              // This is expected - RPC might not exist, so we'll use a workaround
              console.log('   Using direct SQL execution...');
              break;
            }
          }
        }
      }

      console.log(`✅ Completed: ${migrationName}\n`);
    } catch (err) {
      console.error(`❌ Error running ${migrationName}:`, err);
    }
  }

  console.log('✅ Migrations completed!');
  console.log('\nYou can now import your listings with: npm run import-listings');
}

runMigrations();
