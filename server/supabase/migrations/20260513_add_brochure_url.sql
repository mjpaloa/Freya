-- Add brochure_url column to products table
ALTER TABLE products ADD COLUMN IF NOT EXISTS brochure_url TEXT;
