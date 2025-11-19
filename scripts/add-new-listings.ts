import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const newListings = [
  {
    title: 'Kids Kayak',
    price: 50.00,
    description: 'Great for kids',
    category: 'Sports & Outdoors',
    images: [
      '/photos/Kayak 1.jpeg',
      '/photos/Kayak 2.jpeg',
      '/photos/Kayak 3.jpeg'
    ],
    image_url: '/photos/Kayak 1.jpeg',
    sold: false
  },
  {
    title: 'Lamp',
    price: 30.00,
    description: 'Stylish lamp, can be sold together with table or separately',
    category: 'Furniture',
    images: ['/photos/Lamp.jpeg'],
    image_url: '/photos/Lamp.jpeg',
    sold: false
  },
  {
    title: 'LED Spotlight (x2)',
    price: 70.00,
    description: 'LED spotlights for car or Ute. 2 available at $70 for the pair.',
    category: 'Electronics',
    images: ['/photos/LED Spotlight.jpeg'],
    image_url: '/photos/LED Spotlight.jpeg',
    sold: false
  },
  {
    title: 'PlayStation 3',
    price: 25.00,
    description: 'PS3 gaming console',
    category: 'Electronics',
    images: ['/photos/PS3.jpeg'],
    image_url: '/photos/PS3.jpeg',
    sold: false
  },
  {
    title: 'Trampoline',
    price: 250.00,
    description: 'Large outdoor trampoline, great for kids',
    category: 'Sports & Outdoors',
    images: ['/photos/Trampoline.jpeg'],
    image_url: '/photos/Trampoline.jpeg',
    sold: false
  }
];

async function addListings() {
  console.log('📦 Adding 5 new listings...\n');

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
