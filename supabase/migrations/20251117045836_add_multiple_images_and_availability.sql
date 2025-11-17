-- Add support for multiple images and availability dates
-- Change image_url from single text to array of texts
ALTER TABLE listings
  ADD COLUMN images TEXT[] DEFAULT ARRAY[]::TEXT[],
  ADD COLUMN available_date TIMESTAMP WITH TIME ZONE;

-- Migrate existing image_url data to images array
UPDATE listings
SET images = ARRAY[image_url]
WHERE image_url IS NOT NULL AND images = ARRAY[]::TEXT[];

-- Keep image_url for backward compatibility but make it computed
-- The first image in the array will be the primary image
UPDATE listings
SET image_url = images[1]
WHERE array_length(images, 1) > 0;
