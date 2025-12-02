-- Create analytics table to track page views and listing clicks
CREATE TABLE IF NOT EXISTS analytics_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  event_type TEXT NOT NULL, -- 'page_view' or 'listing_click'
  listing_id UUID, -- NULL for page views, populated for listing clicks
  listing_title TEXT, -- Store title for easier reporting
  user_ip TEXT, -- For filtering out local traffic
  user_agent TEXT,
  referrer TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add index for faster queries
CREATE INDEX idx_analytics_event_type ON analytics_events(event_type);
CREATE INDEX idx_analytics_listing_id ON analytics_events(listing_id);
CREATE INDEX idx_analytics_created_at ON analytics_events(created_at);

-- Enable RLS
ALTER TABLE analytics_events ENABLE ROW LEVEL SECURITY;

-- Allow anonymous inserts (for tracking)
CREATE POLICY "Allow anonymous inserts" ON analytics_events
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Allow authenticated reads (for viewing stats)
CREATE POLICY "Allow authenticated reads" ON analytics_events
  FOR SELECT
  TO authenticated
  USING (true);
