'use client';

import type { Listing } from '@/types/listing';
import ImageGallery from './ImageGallery';

interface ListingCardProps {
  listing: Listing;
}

export default function ListingCard({ listing }: ListingCardProps) {
  // Use images array if available, fallback to image_url for backward compatibility
  const images = listing.images && listing.images.length > 0
    ? listing.images
    : [listing.image_url];

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
      <ImageGallery
        images={images}
        title={listing.title}
        sold={listing.sold}
        availableDate={listing.available_date}
      />
      <div className="p-4">
        <h1 className="font-bold text-xl text-gray-900 mb-2 line-clamp-2">
          {listing.title}
        </h1>
        {listing.description && (
          <p className="text-gray-600 text-sm mb-3 line-clamp-3">
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
