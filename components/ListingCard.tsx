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

  const isFree = listing.price === 0;

  return (
    <div className={`bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 flex flex-col ${
      isFree ? 'ring-4 ring-green-400 ring-offset-2 shadow-green-300/50 shadow-2xl' : ''
    }`}>
      <ImageGallery
        images={images}
        title={listing.title}
        sold={listing.sold}
        availableDate={listing.available_date}
        price={listing.price}
      />
      <div className="p-4 flex flex-col flex-grow">
        <h1 className="font-bold text-xl text-gray-900 mb-2 line-clamp-2">
          {listing.title}
        </h1>
        {listing.description && (
          <p className="text-gray-600 text-sm mb-3 line-clamp-3">
            {listing.description}
          </p>
        )}
        <div className="flex items-center justify-between mb-3 mt-auto">
          {isFree ? (
            <span className="text-3xl font-bold text-green-600 animate-pulse">
              FREE
            </span>
          ) : (
            <span className="text-2xl font-bold text-green-600">
              ${listing.price.toFixed(2)}
            </span>
          )}
          <span className="text-xs bg-gray-100 text-gray-700 px-3 py-1 rounded-full">
            {listing.category}
          </span>
        </div>

        {/* Make an Offer Button */}
        <a
          href={`https://wa.me/61490038888?text=${encodeURIComponent(
            isFree
              ? `Hi! I'm interested in the ${listing.title} (FREE item). When can I pick it up?`
              : `Hi! I'd like to make an offer on: ${listing.title} (Listed at $${listing.price.toFixed(2)}). My offer is: $`
          )}`}
          target="_blank"
          rel="noopener noreferrer"
          className={`block w-full text-center py-3 rounded-lg font-semibold transition-all uppercase ${
            isFree
              ? 'bg-green-500 hover:bg-green-600 text-white'
              : 'bg-teal-600 hover:bg-teal-700 text-white'
          }`}
        >
          {isFree ? '📱 Claim Now' : '💬 Make an Offer'}
        </a>
      </div>
    </div>
  );
}
