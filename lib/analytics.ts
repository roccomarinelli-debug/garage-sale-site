import { supabase } from './supabase';

// Check if we're in production (not localhost)
const isProduction = () => {
  if (typeof window === 'undefined') return false;
  return !window.location.hostname.includes('localhost') &&
         !window.location.hostname.includes('127.0.0.1');
};

export async function trackPageView() {
  // Only track in production
  if (!isProduction()) return;

  try {
    await supabase.from('analytics_events').insert({
      event_type: 'page_view',
      user_agent: typeof navigator !== 'undefined' ? navigator.userAgent : null,
      referrer: typeof document !== 'undefined' ? document.referrer : null,
    });
  } catch (error) {
    // Silently fail - don't break the site if analytics fails
    console.error('Analytics error:', error);
  }
}

export async function trackListingClick(listingId: string, listingTitle: string) {
  // Only track in production
  if (!isProduction()) return;

  try {
    await supabase.from('analytics_events').insert({
      event_type: 'listing_click',
      listing_id: listingId,
      listing_title: listingTitle,
      user_agent: typeof navigator !== 'undefined' ? navigator.userAgent : null,
      referrer: typeof document !== 'undefined' ? document.referrer : null,
    });
  } catch (error) {
    // Silently fail
    console.error('Analytics error:', error);
  }
}
