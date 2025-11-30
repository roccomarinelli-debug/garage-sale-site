'use client';

import { useState } from 'react';
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

  const isPlaceholder = images[0]?.includes('placeholder');
  const isFree = listing.price === 0 && !isPlaceholder;
  const [isUnwrapped, setIsUnwrapped] = useState(false);

  return (
    <div className={`bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 flex flex-col relative ${
      isFree ? 'ring-4 ring-red-400 ring-offset-2 shadow-red-300/50 shadow-2xl' : ''
    } ${isPlaceholder ? 'ring-2 ring-blue-300 ring-offset-1' : ''}`}>
      {/* Christmas Gift Wrapper for FREE items */}
      {isFree && !isUnwrapped && (
        <div
          className="absolute inset-0 z-20 cursor-pointer group"
          onClick={() => setIsUnwrapped(true)}
        >
          {/* Gift wrap pattern */}
          <div className="absolute inset-0 bg-gradient-to-br from-red-500 via-red-600 to-red-700">
            {/* Repeated pattern */}
            <div className="absolute inset-0 opacity-30" style={{
              backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255,255,255,0.3) 10px, rgba(255,255,255,0.3) 20px), repeating-linear-gradient(-45deg, transparent, transparent 10px, rgba(255,255,255,0.3) 10px, rgba(255,255,255,0.3) 20px)`
            }}></div>

            {/* Snowflakes */}
            <div className="absolute inset-0 text-white/30 text-2xl">
              <span className="absolute top-4 left-4">❄️</span>
              <span className="absolute top-8 right-8">❄️</span>
              <span className="absolute bottom-12 left-12">❄️</span>
              <span className="absolute bottom-8 right-4">❄️</span>
            </div>
          </div>

          {/* Ribbon */}
          <div className="absolute top-1/2 left-0 right-0 h-12 bg-yellow-400 transform -translate-y-1/2 shadow-lg"></div>
          <div className="absolute top-0 bottom-0 left-1/2 w-12 bg-yellow-400 transform -translate-x-1/2 shadow-lg"></div>

          {/* Bow */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div className="text-6xl drop-shadow-lg animate-pulse">🎀</div>
          </div>

          {/* "Click to unwrap" text */}
          <div className="absolute bottom-4 left-0 right-0 text-center">
            <div className="bg-white/90 text-red-700 px-4 py-2 rounded-full inline-block font-bold text-sm group-hover:scale-110 transition-transform shadow-lg">
              🎁 Click to Unwrap Your FREE Gift! 🎁
            </div>
          </div>
        </div>
      )}

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
          {isPlaceholder ? (
            <span className="text-2xl font-bold text-blue-600">
              Price TBA
            </span>
          ) : isFree ? (
            <span className="text-3xl font-bold text-red-600 animate-pulse flex items-center gap-1">
              🎁 FREE 🎄
            </span>
          ) : (
            <span className="text-2xl font-bold text-green-700">
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
            isPlaceholder
              ? `Hi! I'm interested in the ${listing.title}. Can you provide more details?`
              : isFree
              ? `Hi! I'm interested in the ${listing.title} (FREE item). When can I pick it up?`
              : `Hi! I'd like to make an offer on: ${listing.title} (Listed at $${listing.price.toFixed(2)}). My offer is: $`
          )}`}
          target="_blank"
          rel="noopener noreferrer"
          className={`block w-full text-center py-3 rounded-lg font-semibold transition-all uppercase ${
            isPlaceholder
              ? 'bg-blue-500 hover:bg-blue-600 text-white'
              : isFree
              ? 'bg-red-600 hover:bg-red-700 text-white border-2 border-green-400'
              : 'bg-green-700 hover:bg-green-800 text-white'
          }`}
        >
          {isPlaceholder ? '📧 Ask About This' : isFree ? '🎁 Claim Your FREE Gift!' : '💬 Make an Offer'}
        </a>
      </div>
    </div>
  );
}
