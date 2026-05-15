-- Create Inquiries table to handle Technical and Sales submissions
CREATE TABLE IF NOT EXISTS inquiries (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  type TEXT NOT NULL, -- 'technical' or 'sales'
  
  -- Technical specific
  full_name TEXT,
  facility_id TEXT,
  subject TEXT,
  
  -- Sales specific
  first_name TEXT,
  last_name TEXT,
  contact_number TEXT,
  job_title TEXT,
  clinical_specialty TEXT,
  company_hospital TEXT,
  product_interest TEXT,
  marketing_consent BOOLEAN DEFAULT FALSE,
  
  -- Shared
  email TEXT NOT NULL,
  message TEXT, -- used for 'Your Message' in technical
  status TEXT DEFAULT 'pending', -- 'pending', 'responded', 'closed'
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Enable RLS
ALTER TABLE inquiries ENABLE ROW LEVEL SECURITY;

-- Allow public to insert (for the website forms)
CREATE POLICY "Enable insert for all users" ON inquiries FOR INSERT WITH CHECK (true);

-- Allow authenticated admins to view all
CREATE POLICY "Enable select for authenticated users" ON inquiries FOR SELECT USING (auth.role() = 'authenticated');

-- Allow authenticated admins to update (status)
CREATE POLICY "Enable update for authenticated users" ON inquiries FOR UPDATE USING (auth.role() = 'authenticated');
