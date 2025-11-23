import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const updates = [
  {
    title: 'Townie Bike',
    price: 120.00,
    description: 'Renovators delight - needs new tyres, new chain and a service. Comfortable cruiser bike, perfect for around town.'
  },
  {
    title: 'Surfboards',
    price: 50.00,
    description: 'Quality surfboards, ready for the waves - $50 each'
  },
  {
    title: 'Steam Vacuum',
    price: 40.00,
    description: 'Brand-new, never been used. Steam vacuum cleaner, powerful cleaning'
  },
  {
    title: 'Specialized BMX',
    price: 50.00,
    description: 'Specialized brand BMX bike - needs a new chain and new brakes'
  },
  {
    title: 'Philips Sodastream',
    price: 15.00,
    description: 'Philips Sodastream machine for making sparkling water'
  },
  {
    title: 'High Table',
    price: 150.00,
    description: 'Bar height table, modern design'
  },
  {
    title: 'Finska Game',
    price: 5.00,
    description: 'Finnish outdoor throwing game (Mölkky)'
  },
  {
    title: 'Childrens Bike',
    price: 80.00,
    description: 'Kids bike in great condition'
  },
  {
    title: 'Box of Lego',
    price: 0.00,
    description: 'Large box of assorted Lego pieces - FREE!'
  },
  {
    title: 'BMX Bike',
    price: 300.00,
    description: 'BMX bike, good condition'
  }
];

async function updateListings() {
  console.log('🔧 Updating listings with new prices and descriptions...\n');

  for (const update of updates) {
    const { error } = await supabase
      .from('listings')
      .update({
        price: update.price,
        description: update.description
      })
      .eq('title', update.title);

    if (error) {
      console.error(`❌ Error updating ${update.title}:`, error);
    } else {
      console.log(`✅ Updated: ${update.title} - $${update.price.toFixed(2)}`);
    }
  }

  console.log('\n✅ All listings updated!');
}

updateListings();
