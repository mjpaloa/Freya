-- Create News Articles table
CREATE TABLE news_articles (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  category TEXT NOT NULL,
  title TEXT NOT NULL,
  excerpt TEXT NOT NULL,
  content TEXT NOT NULL,
  published_date TEXT NOT NULL,
  image_url TEXT,
  featured BOOLEAN DEFAULT FALSE,
  article_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Seed initial data
INSERT INTO news_articles (category, title, excerpt, content, published_date, image_url, featured, article_url)
VALUES 
(
  'COLLABORATION', 
  'BRINGING IN MODERN HEALTHCARE FACILITIES AND SERVICES TO CASIGURAN', 
  'This collaboration aims to provide reliable, affordable and accessible healthcare services to the community.', 
  'Freya Trading is proud to announce its latest partnership with the local government of Casiguran. This collaboration aims to provide reliable, affordable and accessible healthcare services to the community. By bringing in modern medical equipment and specialized training for local healthcare workers, we are ensuring that the residents of Casiguran have access to the same quality of care found in major metropolitan centers.\n\nThe project includes the installation of state-of-the-art diagnostic imaging systems and a comprehensive maintenance program to ensure long-term sustainability.',
  'September 26, 2025', 
  '/assets/news/featured-news.jpg', 
  TRUE, 
  '#'
),
(
  'REGULATORY', 
  'New FDA Compliance Standards for Imported Medical Electronics', 
  'A comprehensive guide on the latest regulatory shifts affecting medical device importation and safety protocols.', 
  'The Food and Drug Administration (FDA) has recently released updated guidelines for the importation of medical electronic devices. These new standards focus on electromagnetic compatibility and enhanced safety protocols for equipment used in critical care environments. Importers and distributors must now provide additional documentation regarding the manufacturing process and quality control measures.\n\nFreya Trading is fully committed to these new standards, ensuring all our products meet or exceed the required safety benchmarks.',
  'Oct 20, 2024', 
  '/assets/news/news-2.jpg', 
  FALSE, 
  '#'
),
(
  'TECHNICAL', 
  'Maintaining Peak Performance: Ultrasound Transducer Care', 
  'Technical bulletin on prolonging the lifespan of high-frequency transducers through proper sterilization and handling.', 
  'Ultrasound transducers are delicate instruments that require precise care to maintain their imaging quality. This technical bulletin outlines the best practices for cleaning and disinfecting transducers without damaging the sensitive piezo-electric crystals. Proper handling, storage, and the use of approved cleaning agents are essential for prolonging the life of these critical diagnostic tools.\n\nRegular inspections for cable wear and crystal delamination are also recommended to prevent unexpected equipment failure.',
  'Oct 15, 2024', 
  '/assets/news/news-3.jpg', 
  FALSE, 
  '#'
),
(
  'COMPANY', 
  'Freya Trading Expands Logistics Hub in Davao City', 
  'Enhancing our service reach in Mindanao with a dedicated logistics and technical support center.', 
  'To better serve our clients in the Mindanao region, Freya Trading is expanding its logistics and technical support hub in Davao City. This expansion includes a larger warehouse for spare parts inventory and a state-of-the-art service center staffed by factory-trained engineers. By reducing response times and improving part availability, we aim to minimize equipment downtime for our healthcare partners across the southern Philippines.',
  'Oct 08, 2024', 
  '/assets/news/news-4.jpg', 
  FALSE, 
  '#'
),
(
  'INNOVATION', 
  'The Impact of Portable Diagnostic Tools on Rural Health', 
  'How mobile diagnostic technology is closing the gap in healthcare accessibility across the archipelago.', 
  'Portable diagnostic tools are revolutionizing healthcare delivery in remote areas of the Philippines. From handheld ultrasound devices to mobile laboratory kits, these innovations allow clinicians to perform critical assessments at the point of care, even in communities far from the nearest hospital. This article explores how these technologies are being integrated into community health programs to improve maternal health and early disease detection.',
  'Sep 28, 2024', 
  '/assets/news/news-5.jpg', 
  FALSE, 
  '#'
);

