'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import type { Listing } from '@/types/listing';
import ListingCard from '@/components/ListingCard';
import CategoryFilter from '@/components/CategoryFilter';

export default function Home() {
  const [listings, setListings] = useState<Listing[]>([]);
  const [filteredListings, setFilteredListings] = useState<Listing[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchListings();
  }, []);

  useEffect(() => {
    if (selectedCategory === 'All') {
      setFilteredListings(listings);
    } else {
      setFilteredListings(
        listings.filter((listing) => listing.category === selectedCategory)
      );
    }
  }, [selectedCategory, listings]);

  async function fetchListings() {
    try {
      // Check if Supabase is configured
      const isConfigured =
        process.env.NEXT_PUBLIC_SUPABASE_URL &&
        process.env.NEXT_PUBLIC_SUPABASE_URL !== 'https://placeholder.supabase.co';

      if (!isConfigured) {
        setError(null); // Don't show error, just empty state
        setLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from('listings')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setListings(data || []);
    } catch (err) {
      console.error('Error fetching listings:', err);
      setError('Failed to load listings. Please check your Supabase configuration.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <header className="bg-white shadow-md sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 mb-2 uppercase">
              Super Garage Sale
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 font-medium">
              Great stuff, Great Prices
            </p>
          </div>
        </div>
      </header>

      {/* Contact & Info Banner - Reduced height */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
            {/* Location */}
            <div className="flex flex-col items-center">
              <div className="text-3xl mb-2">📍</div>
              <a
                href="https://maps.google.com/?q=5+Armstrong+Street+Suffolk+VIC"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-blue-100 transition-colors text-sm font-medium"
              >
                5 Armstrong Street, Suffolk
              </a>
            </div>

            {/* Hours */}
            <div className="flex flex-col items-center">
              <div className="text-3xl mb-2">🕒</div>
              <div className="text-sm">
                <p className="text-white font-medium">Mon-Fri 9am-5pm</p>
                <p className="text-white font-medium">Sat 9am-12pm</p>
                <p className="text-blue-100 text-xs mt-1">Call ahead for drop ins at other times</p>
              </div>
            </div>

            {/* Contact */}
            <div className="flex flex-col items-center">
              <div className="text-3xl mb-2">📞</div>
              <a
                href="tel:0490038888"
                className="text-white font-semibold text-lg hover:text-blue-100 transition-colors"
              >
                0490 038 888
              </a>
            </div>
          </div>

          <div className="mt-4 text-center border-t border-white/20 pt-3">
            <p className="text-blue-100 text-sm">
              We're moving overseas on the 22nd December so some items aren't available until closer to then
            </p>
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 pt-4 pb-8 sm:px-6 lg:px-8">
        {/* Category Filter */}
        <div className="mb-6">
          <CategoryFilter
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
          />
        </div>

        {/* Loading State */}
        {loading && (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            <p className="mt-4 text-gray-600">Loading items...</p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-8">
            <p className="font-medium">Error</p>
            <p className="text-sm">{error}</p>
            <p className="text-sm mt-2">
              Make sure you&apos;ve set up your Supabase database. See SETUP.md for instructions.
            </p>
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && filteredListings.length === 0 && (
          <div className="text-center py-12 max-w-2xl mx-auto">
            <div className="text-6xl mb-4">
              {process.env.NEXT_PUBLIC_SUPABASE_URL &&
              process.env.NEXT_PUBLIC_SUPABASE_URL !==
                'https://placeholder.supabase.co'
                ? '📦'
                : '👋'}
            </div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              {process.env.NEXT_PUBLIC_SUPABASE_URL &&
              process.env.NEXT_PUBLIC_SUPABASE_URL !==
                'https://placeholder.supabase.co'
                ? selectedCategory === 'All'
                  ? 'No items found'
                  : `No items in ${selectedCategory}`
                : 'Welcome to Your Garage Sale Website!'}
            </h3>
            <p className="text-gray-600 mb-4">
              {process.env.NEXT_PUBLIC_SUPABASE_URL &&
              process.env.NEXT_PUBLIC_SUPABASE_URL !==
                'https://placeholder.supabase.co'
                ? selectedCategory === 'All'
                  ? 'Start adding items to your garage sale!'
                  : `Try selecting a different category.`
                : 'This is what your garage sale site looks like! To add items and make it functional:'}
            </p>
            {(!process.env.NEXT_PUBLIC_SUPABASE_URL ||
              process.env.NEXT_PUBLIC_SUPABASE_URL ===
                'https://placeholder.supabase.co') && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 text-left">
                <h4 className="font-semibold text-blue-900 mb-3">
                  Quick Setup (5 minutes):
                </h4>
                <ol className="text-sm text-blue-800 space-y-2 list-decimal list-inside">
                  <li>
                    Create a free Supabase account at{' '}
                    <span className="font-mono bg-blue-100 px-1 rounded">
                      supabase.com
                    </span>
                  </li>
                  <li>Run the SQL from SETUP.md to create the listings table</li>
                  <li>
                    Copy your credentials to{' '}
                    <span className="font-mono bg-blue-100 px-1 rounded">
                      .env.local
                    </span>
                  </li>
                  <li>Add photos to the photos folder and create listings</li>
                </ol>
                <p className="text-xs text-blue-700 mt-4">
                  See QUICKSTART.md for detailed instructions
                </p>
              </div>
            )}
          </div>
        )}

        {/* Listings Grid */}
        {!loading && !error && filteredListings.length > 0 && (
          <>
            <div className="mb-4 text-center sm:text-left">
              <p className="text-gray-600">
                <span className="font-semibold text-gray-800">
                  {filteredListings.length}
                </span>{' '}
                {filteredListings.length === 1 ? 'item' : 'items'}
                {selectedCategory !== 'All' && ` in ${selectedCategory}`}
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredListings.map((listing) => (
                <ListingCard key={listing.id} listing={listing} />
              ))}
            </div>
          </>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-16">
        <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
          <p className="text-center text-gray-600 text-sm">
            5 Armstrong Street, Suffolk • Mon-Fri 9-5 • Call Rocco: 0490 038 888
          </p>
        </div>
      </footer>
    </div>
  );
}
