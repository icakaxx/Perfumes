-- Migration script to move products to separate gender tables
-- Run this after creating the new tables

-- Insert women's perfumes (Feminine)
INSERT INTO women_perfumes (name, brand, description, image_url, concentration, top_notes, heart_notes, base_notes, variants, rating)
SELECT 
  name,
  brand,
  description,
  image_url,
  concentration,
  top_notes,
  heart_notes,
  base_notes,
  variants::jsonb,
  rating
FROM products 
WHERE gender_profile = 'Feminine';

-- Insert men's perfumes (Masculine)
INSERT INTO men_perfumes (name, brand, description, image_url, concentration, top_notes, heart_notes, base_notes, variants, rating)
SELECT 
  name,
  brand,
  description,
  image_url,
  concentration,
  top_notes,
  heart_notes,
  base_notes,
  variants::jsonb,
  rating
FROM products 
WHERE gender_profile = 'Masculine';

-- Note: Unisex perfumes can be added to both tables or kept in a separate unisex_perfumes table
-- For now, we'll add them to both tables
INSERT INTO women_perfumes (name, brand, description, image_url, concentration, top_notes, heart_notes, base_notes, variants, rating)
SELECT 
  name,
  brand,
  description,
  image_url,
  concentration,
  top_notes,
  heart_notes,
  base_notes,
  variants::jsonb,
  rating
FROM products 
WHERE gender_profile = 'Unisex';

INSERT INTO men_perfumes (name, brand, description, image_url, concentration, top_notes, heart_notes, base_notes, variants, rating)
SELECT 
  name,
  brand,
  description,
  image_url,
  concentration,
  top_notes,
  heart_notes,
  base_notes,
  variants::jsonb,
  rating
FROM products 
WHERE gender_profile = 'Unisex';

