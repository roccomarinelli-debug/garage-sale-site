'use client';

import Image from 'next/image';
import type { Listing } from '@/types/listing';

interface ListingCardProps {
  listing: Listing;
}

export default function ListingCard({ listing }: ListingCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
      <div className="relative w-full aspect-square">
        <Image
          src={listing.image_url}
          alt={listing.title}
          fill
          className="object-cover"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        {listing.sold && (
          <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
            <span className="text-white text-2xl font-bold px-6 py-3 bg-red-600 rounded-lg">
              SOLD
            </span>
          </div>
        )}
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-lg text-gray-900 mb-2 line-clamp-2">
          {listing.title}
        </h3>
        {listing.description && (
          <p className="text-gray-600 text-sm mb-3 line-clamp-2">
            {listing.description}
          </p>
        )}
        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-green-600">
            ${listing.price.toFixed(2)}
          </span>
          <span className="text-xs bg-gray-100 text-gray-700 px-3 py-1 rounded-full">
            {listing.category}
          </span>
        </div>
      </div>
    </div>
  );
}
