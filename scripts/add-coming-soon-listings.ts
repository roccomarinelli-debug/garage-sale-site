import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const newListings = [
  {
    title: 'Super Cool Mushroom Grow Box',
    price: 0, // TBA
    description: 'Lorem ipsum',
    category: 'Garden',
    images: ['/photos/placeholder.svg'],
    image_url: '/photos/placeholder.svg',
    sold: false,
    available_date: '2025-11-25T09:00:00Z' // Tomorrow morning
  },
  {
    title: 'Christmas Tree Holder',
    price: 10.00,
    description: 'Lorem ipsum',
    category: 'Other',
    images: ['/photos/placeholder.svg'],
    image_url: '/photos/placeholder.svg',
    sold: false,
    available_date: '2025-11-25T09:00:00Z'
  },
  {
    title: 'Glass Vase',
    price: 0, // TBA - will add diameter later
    description: 'Lorem ipsum',
    category: 'Furniture',
    images: ['/photos/placeholder.svg'],
    image_url: '/photos/placeholder.svg',
    sold: false,
    available_date: '2025-11-25T09:00:00Z'
  },
  {
    title: 'Bosch Electric Chainsaw',
    price: 0, // TBA - will add specs later
    description: 'Lorem ipsum',
    category: 'Tools',
    images: ['/photos/placeholder.svg'],
    image_url: '/photos/placeholder.svg',
    sold: false,
    available_date: '2025-11-25T09:00:00Z'
  },
  {
    title: 'Wanderer Camp Mattress (Queen Size)',
    price: 0, // TBA
    description: 'Lorem ipsum',
    category: 'Sports & Outdoors',
    images: ['/photos/placeholder.svg'],
    image_url: '/photos/placeholder.svg',
    sold: false,
    available_date: '2025-11-25T09:00:00Z'
  },
  {
    title: 'Beach Sand Shovel',
    price: 0, // TBA
    description: 'Lorem ipsum',
    category: 'Sports & Outdoors',
    images: ['/photos/placeholder.svg'],
    image_url: '/photos/placeholder.svg',
    sold: false,
    available_date: '2025-11-25T09:00:00Z'
  },
  {
    title: 'Camping Chairs (x2)',
    price: 0, // TBA
    description: 'Lorem ipsum',
    category: 'Sports & Outdoors',
    images: ['/photos/placeholder.svg'],
    image_url: '/photos/placeholder.svg',
    sold: false,
    available_date: '2025-11-25T09:00:00Z'
  },
  {
    title: '1m Spirit Level',
    price: 0, // TBA
    description: 'Lorem ipsum',
    category: 'Tools',
    images: ['/photos/placeholder.svg'],
    image_url: '/photos/placeholder.svg',
    sold: false,
    available_date: '2025-11-25T09:00:00Z'
  },
  {
    title: 'Dual Arm Monitor Holder',
    price: 0, // TBA
    description: 'Lorem ipsum',
    category: 'Electronics',
    images: ['/photos/placeholder.svg'],
    image_url: '/photos/placeholder.svg',
    sold: false,
    available_date: '2025-11-25T09:00:00Z'
  },
  {
    title: 'Bike Mechanic Stand',
    price: 0, // TBA
    description: 'Lorem ipsum',
    category: 'Sports & Outdoors',
    images: ['/photos/placeholder.svg'],
    image_url: '/photos/placeholder.svg',
    sold: false,
    available_date: '2025-11-25T09:00:00Z'
  },
  {
    title: '12kg Kettlebells',
    price: 0, // TBA
    description: 'Lorem ipsum',
    category: 'Sports & Outdoors',
    images: ['/photos/placeholder.svg'],
    image_url: '/photos/placeholder.svg',
    sold: false,
    available_date: '2025-11-25T09:00:00Z'
  }
];

async function addListings() {
  console.log('📦 Adding 11 new "Coming Soon" listings...\n');

  for (const listing of newListings) {
    const { error } = await supabase
      .from('listings')
      .insert(listing);

    if (error) {
      console.error(`❌ Error adding ${listing.title}:`, error);
    } else {
      const priceDisplay = listing.price === 0 ? 'TBA' : `$${listing.price}`;
      console.log(`✅ Added: ${listing.title} - ${priceDisplay} (Coming Soon)`);
    }
  }

  console.log('\n✅ All new "Coming Soon" listings added!');
}

addListings();
