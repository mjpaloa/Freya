export interface NewsArticle {
  id: string;
  category: string;
  title: string;
  excerpt: string;
  date: string;
  image: string;
  featured?: boolean;
}

export const newsArticles: NewsArticle[] = [
  {
    id: '1',
    category: 'COLLABORATION',
    title: 'BRINGING IN MODERN HEALTHCARE FACILITIES AND SERVICES TO CASIGURAN',
    excerpt: 'This collaboration aims to provide reliable, affordable and accessible healthcare services to the community.',
    date: 'September 26, 2025',
    image: '/assets/news/featured-news.jpg',
    featured: true
  },
  {
    id: '2',
    category: 'REGULATORY',
    title: 'New FDA Compliance Standards for Imported Medical Electronics',
    excerpt: 'A comprehensive guide on the latest regulatory shifts affecting medical device importation and safety protocols.',
    date: 'Oct 20, 2024',
    image: '/assets/news/news-2.jpg'
  },
  {
    id: '3',
    category: 'TECHNICAL',
    title: 'Maintaining Peak Performance: Ultrasound Transducer Care',
    excerpt: 'Technical bulletin on prolonging the lifespan of high-frequency transducers through proper sterilization and handling.',
    date: 'Oct 15, 2024',
    image: '/assets/news/news-3.jpg'
  },
  {
    id: '4',
    category: 'COMPANY',
    title: 'Freya Trading Expands Logistics Hub in Davao City',
    excerpt: 'Enhancing our service reach in Mindanao with a dedicated logistics and technical support center.',
    date: 'Oct 08, 2024',
    image: '/assets/news/news-4.jpg'
  },
  {
    id: '5',
    category: 'INNOVATION',
    title: 'The Impact of Portable Diagnostic Tools on Rural Health',
    excerpt: 'How mobile diagnostic technology is closing the gap in healthcare accessibility across the archipelago.',
    date: 'Sep 28, 2024',
    image: '/assets/news/news-5.jpg'
  }
];

export const trendingNews = [
  {
    id: 't1',
    rank: '01',
    title: 'Top 5 MRI safety protocols every clinic must implement in 2024',
    category: 'INDUSTRY NEWS'
  },
  {
    id: 't2',
    rank: '02',
    title: 'Comparing CMOS vs TFT detectors for modern radiography',
    category: 'TECHNICAL'
  },
  {
    id: 't3',
    rank: '03',
    title: 'Freya Trading wins Distributor of the Year Award',
    category: 'COMPANY'
  }
];

export const categories = [
  { name: 'Industry News', count: 12 },
  { name: 'Technical Bulletins', count: 35 },
  { name: 'Company Announcements', count: 15 },
  { name: 'Regulatory Updates', count: 22 }
];
