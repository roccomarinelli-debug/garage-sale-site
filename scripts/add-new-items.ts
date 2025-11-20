import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const newListings = [
  {
    title: 'BMX Bike',
    price: 50.00,
    description: 'BMX bike, good condition',
    category: 'Sports & Outdoors',
    images: ['/photos/BMX.jpeg'],
    image_url: '/photos/BMX.jpeg',
    sold: false
  },
  {
    title: 'Box of Lego',
    price: 30.00,
    description: 'Large box of assorted Lego pieces',
    category: 'Toys & Games',
    images: ['/photos/Box o leggo.jpeg'],
    image_url: '/photos/Box o leggo.jpeg',
    sold: false
  },
  {
    title: 'Childrens Bike',
    price: 40.00,
    description: 'Kids bike in great condition',
    category: 'Sports & Outdoors',
    images: ['/photos/Childrens Bike.jpeg'],
    image_url: '/photos/Childrens Bike.jpeg',
    sold: false
  },
  {
    title: 'Wall Clock',
    price: 15.00,
    description: 'Decorative wall clock',
    category: 'Furniture',
    images: ['/photos/Clock.jpeg'],
    image_url: '/photos/Clock.jpeg',
    sold: false
  },
  {
    title: 'Dehydrator',
    price: 40.00,
    description: 'Food dehydrator, excellent condition',
    category: 'Appliances',
    images: ['/photos/Dehydrator.jpeg'],
    image_url: '/photos/Dehydrator.jpeg',
    sold: false
  },
  {
    title: 'Finska Game',
    price: 25.00,
    description: 'Finnish outdoor throwing game (Mölkky)',
    category: 'Toys & Games',
    images: ['/photos/Finska Game.jpeg'],
    image_url: '/photos/Finska Game.jpeg',
    sold: false
  },
  {
    title: 'High Table',
    price: 80.00,
    description: 'Bar height table, modern design',
    category: 'Furniture',
    images: ['/photos/High Table.jpeg'],
    image_url: '/photos/High Table.jpeg',
    sold: false
  },
  {
    title: 'Philips Sodastream',
    price: 30.00,
    description: 'Philips Sodastream machine for making sparkling water',
    category: 'Appliances',
    images: ['/photos/Phillips Sodastream.jpeg'],
    image_url: '/photos/Phillips Sodastream.jpeg',
    sold: false
  },
  {
    title: 'Push Up Bar',
    price: 15.00,
    description: 'Push up bars for home workouts',
    category: 'Sports & Outdoors',
    images: ['/photos/Push Up bar.jpeg'],
    image_url: '/photos/Push Up bar.jpeg',
    sold: false
  },
  {
    title: 'Specialized BMX',
    price: 150.00,
    description: 'Specialized brand BMX bike, excellent condition',
    category: 'Sports & Outdoors',
    images: ['/photos/Specialized BMX.jpeg'],
    image_url: '/photos/Specialized BMX.jpeg',
    sold: false
  },
  {
    title: 'Steam Vacuum',
    price: 80.00,
    description: 'Steam vacuum cleaner, powerful cleaning',
    category: 'Appliances',
    images: ['/photos/Steam Vacuum.jpeg'],
    image_url: '/photos/Steam Vacuum.jpeg',
    sold: false
  },
  {
    title: 'Surfboards',
    price: 200.00,
    description: 'Quality surfboards, ready for the waves',
    category: 'Sports & Outdoors',
    images: ['/photos/Surfboards.jpeg'],
    image_url: '/photos/Surfboards.jpeg',
    sold: false
  },
  {
    title: 'Townie Bike',
    price: 120.00,
    description: 'Comfortable cruiser bike, perfect for around town',
    category: 'Sports & Outdoors',
    images: ['/photos/Townie Bike.jpeg'],
    image_url: '/photos/Townie Bike.jpeg',
    sold: false
  },
  {
    title: 'Viper Bar',
    price: 50.00,
    description: 'Exercise bar for home gym',
    category: 'Sports & Outdoors',
    images: ['/photos/Viper Bar.jpeg'],
    image_url: '/photos/Viper Bar.jpeg',
    sold: false
  }
];

async function addListings() {
  console.log('📦 Adding 14 new listings...\n');

  for (const listing of newListings) {
    const { error } = await supabase
      .from('listings')
      .insert(listing);

    if (error) {
      console.error(`❌ Error adding ${listing.title}:`, error);
    } else {
      console.log(`✅ Added: ${listing.title} - $${listing.price}`);
    }
  }

  console.log('\n✅ All new listings added!');
}

addListings();
