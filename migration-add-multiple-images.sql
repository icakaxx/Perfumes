-- Migration to add support for multiple images per perfume
-- Run this SQL in your Supabase SQL editor

-- Add image_urls column to women_perfumes table
ALTER TABLE women_perfumes 
ADD COLUMN image_urls TEXT[] DEFAULT ARRAY[]::TEXT[];

-- Add image_urls column to men_perfumes table  
ALTER TABLE men_perfumes 
ADD COLUMN image_urls TEXT[] DEFAULT ARRAY[]::TEXT[];

-- Migrate existing image_url data to image_urls array
UPDATE women_perfumes 
SET image_urls = ARRAY[image_url] 
WHERE image_url IS NOT NULL AND image_url != '';

UPDATE men_perfumes 
SET image_urls = ARRAY[image_url] 
WHERE image_url IS NOT NULL AND image_url != '';

-- Optional: Keep the original image_url column for backward compatibility
-- Or remove it if you want to fully migrate to the new structure
-- ALTER TABLE women_perfumes DROP COLUMN image_url;
-- ALTER TABLE men_perfumes DROP COLUMN image_url;
