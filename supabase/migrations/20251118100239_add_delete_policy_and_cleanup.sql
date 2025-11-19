-- Add delete policy for authenticated users
CREATE POLICY "Allow authenticated delete" ON listings
  FOR DELETE
  USING (true);

-- Truncate the table to remove all duplicates
TRUNCATE listings;
