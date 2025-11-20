'use client';

import { useState } from 'react';
import Image from 'next/image';

interface ImageGalleryProps {
  images: string[];
  title: string;
  sold?: boolean;
  availableDate?: string | null;
}

export default function ImageGallery({
  images,
  title,
  sold,
  availableDate,
}: ImageGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const hasMultipleImages = images.length > 1;

  const isAvailableSoon = availableDate && new Date(availableDate) > new Date();
  const formattedAvailableDate = availableDate
    ? new Date(availableDate).toLocaleDateString('en-AU', {
        month: 'short',
        day: 'numeric',
      })
    : null;

  return (
    <div className="relative">
      {/* Main Image */}
      <div className="relative w-full aspect-square bg-gray-100">
        <Image
          src={images[currentIndex] || images[0]}
          alt={`${title} - Image ${currentIndex + 1}`}
          fill
          className="object-cover"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          priority={currentIndex === 0}
        />

        {/* Availability Badge - Top Left */}
        {isAvailableSoon && (
          <div className="absolute top-3 left-3 bg-orange-500 text-white px-3 py-1.5 rounded-full text-xs font-semibold shadow-lg z-10">
            Available {formattedAvailableDate}
          </div>
        )}

        {/* Sold Overlay */}
        {sold && (
          <div className="absolute inset-0 bg-black/60 flex items-center justify-center z-10">
            <span className="text-white text-2xl font-bold px-6 py-3 bg-red-600 rounded-lg shadow-xl">
              SOLD
            </span>
          </div>
        )}

        {/* Navigation Arrows (only if multiple images) */}
        {hasMultipleImages && !sold && (
          <>
            <button
              onClick={() =>
                setCurrentIndex((prev) =>
                  prev === 0 ? images.length - 1 : prev - 1
                )
              }
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors z-10"
              aria-label="Previous image"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
            <button
              onClick={() =>
                setCurrentIndex((prev) =>
                  prev === images.length - 1 ? 0 : prev + 1
                )
              }
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors z-10"
              aria-label="Next image"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </>
        )}

        {/* Image Counter */}
        {hasMultipleImages && (
          <div className="absolute bottom-3 right-3 bg-black/60 text-white px-2 py-1 rounded text-xs font-medium">
            {currentIndex + 1} / {images.length}
          </div>
        )}
      </div>

      {/* Thumbnail Gallery (only if multiple images) */}
      {hasMultipleImages && (
        <div className="flex gap-2 mt-2 overflow-x-auto pb-2">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`relative flex-shrink-0 w-16 h-16 rounded overflow-hidden border-2 transition-all ${
                index === currentIndex
                  ? 'border-blue-600 ring-2 ring-blue-300'
                  : 'border-gray-200 hover:border-gray-400'
              }`}
            >
              <Image
                src={image}
                alt={`${title} thumbnail ${index + 1}`}
                fill
                className="object-cover"
                sizes="64px"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
