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
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-green-50 relative overflow-x-hidden">
      {/* Snowflakes decoration */}
      <div className="fixed inset-0 pointer-events-none z-0" style={{background: 'radial-gradient(circle at 20% 50%, rgba(255,255,255,0.3) 0%, transparent 2%), radial-gradient(circle at 60% 30%, rgba(255,255,255,0.3) 0%, transparent 2%), radial-gradient(circle at 80% 70%, rgba(255,255,255,0.3) 0%, transparent 2%)', backgroundSize: '200px 200px'}}>
      </div>

      {/* Header with gradient background */}
      <header className="bg-gradient-to-r from-red-600 to-green-600 shadow-md sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-3 sm:px-6 lg:px-8">
          <div className="text-center mb-2">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-1 uppercase flex items-center justify-center gap-2">
              <span className="text-4xl">🎄</span>
              XMAS GARAGE SALE
              <span className="relative inline-block">
                {/* Wrapped gift effect */}
                <span className="absolute inset-0 bg-red-500 rounded" style={{transform: 'scale(1.3)', zIndex: -1}}></span>
                <span className="absolute inset-0 bg-yellow-400" style={{width: '20%', left: '40%', transform: 'scale(1.3)', zIndex: 0}}></span>
                <span className="text-4xl relative z-10">🎁</span>
              </span>
            </h1>
          </div>

          {/* Compact info bar */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 text-white text-xs">
            <a href="https://maps.google.com/?q=5+Armstrong+Street+Suffolk+VIC" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-1 hover:text-red-100">
              <span>📍</span>
              <span className="font-medium">5 Armstrong St, Suffolk</span>
            </a>
            <div className="flex items-center justify-center gap-1">
              <span>🕒</span>
              <span className="font-medium">M-F 9-5, Sat 9-12</span>
            </div>
            <a href="tel:0490038888" className="flex items-center justify-center gap-1 hover:text-red-100">
              <span>📞</span>
              <span className="font-semibold">0490 038 888</span>
            </a>
            <div className="flex items-center justify-center gap-1 col-span-2 lg:col-span-1">
              <span>📦</span>
              <span className="font-medium">Moving 21 Dec</span>
            </div>
          </div>
        </div>
      </header>

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
