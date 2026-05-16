import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'https://freya-server-mu.vercel.app/api';

export interface ServerProduct {
  id: string;
  name: string;
  type: string;
  info?: string;
  image_url?: string;
  brochure_url?: string;
  created_at: string;
}

export interface WebProduct {
  id: string;
  name: string;
  category: string;
  description: string;
  image: string;
  features: string[];
  categorizedSpecs?: { title: string, items: string[] }[];
  usage?: string;
  brochure_url?: string;
}

export const fetchProducts = async (): Promise<WebProduct[]> => {
  try {
    const response = await axios.get(`${API_URL}/products`);
    const serverProducts: ServerProduct[] = response.data;

    return serverProducts.map(sp => {
      // Parse the 'info' string
      const infoText = sp.info || '';
      
      // Attempt to extract description, specs, and usage
      let description = infoText;
      let features: string[] = [];
      let categorizedSpecs: { title: string, items: string[] }[] = [];
      let usage = '';

      if (infoText.includes('[TECHNICAL SPECS]')) {
        description = infoText.split('[TECHNICAL SPECS]')[0]?.replace('[DESCRIPTION]', '').trim() || infoText;
        const specsPart = infoText.split('[TECHNICAL SPECS]')[1] || '';
        const specs = specsPart.split('[USAGE]')[0]?.trim() || '';
        usage = specsPart.split('[USAGE]')[1]?.trim() || '';
        
        if (specs) {
          const lines = specs.split('\n').map(s => s.trim()).filter(Boolean);
          let currentSection: { title: string, items: string[] } | null = null;
          
          lines.forEach(line => {
            if (!line.startsWith('-') && !line.startsWith('•') && !line.startsWith('*')) {
              if (currentSection) categorizedSpecs.push(currentSection);
              currentSection = { title: line, items: [] };
            } else if (currentSection) {
              currentSection.items.push(line.replace(/^[-•*]/, '').trim());
            } else {
              features.push(line.replace(/^[-•*]/, '').trim());
            }
          });
          if (currentSection) categorizedSpecs.push(currentSection);
        }
      }

      return {
        id: sp.id,
        name: sp.name,
        category: sp.type,
        description: description,
        image: sp.image_url || 'https://placehold.co/600x400/0b1c30/ffffff?text=Image+Coming+Soon',
        features: features,
        categorizedSpecs: categorizedSpecs.length > 0 ? categorizedSpecs : undefined,
        usage: usage,
        brochure_url: sp.brochure_url
      };
    });
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
};

export const fetchProductById = async (id: string): Promise<WebProduct | null> => {
  try {
    const response = await axios.get(`${API_URL}/products/${id}`);
    const sp: ServerProduct = response.data;

    // Parse the 'info' string
    const infoText = sp.info || '';
    
    // Attempt to extract description, specs, and usage
    let description = infoText;
    let features: string[] = [];
    let categorizedSpecs: { title: string, items: string[] }[] = [];
    let usage = '';

      if (infoText.includes('[TECHNICAL SPECS]')) {
        description = infoText.split('[TECHNICAL SPECS]')[0]?.replace('[DESCRIPTION]', '').trim() || infoText;
        const specsPart = infoText.split('[TECHNICAL SPECS]')[1] || '';
        const specs = specsPart.split('[USAGE]')[0]?.trim() || '';
        usage = specsPart.split('[USAGE]')[1]?.trim() || '';
        
        if (specs) {
          const lines = specs.split('\n').map(s => s.trim()).filter(Boolean);
          let currentSection: { title: string, items: string[] } | null = null;
          
          lines.forEach(line => {
            // If line doesn't start with a dash/bullet, treat it as a potential title
            if (!line.startsWith('-') && !line.startsWith('•') && !line.startsWith('*')) {
              if (currentSection) categorizedSpecs.push(currentSection);
              currentSection = { title: line, items: [] };
            } else if (currentSection) {
              // It's a bullet point under a title
              currentSection.items.push(line.replace(/^[-•*]/, '').trim());
            } else {
              // It's a bullet point but no title was defined yet
              features.push(line.replace(/^[-•*]/, '').trim());
            }
          });
          if (currentSection) categorizedSpecs.push(currentSection);
        }
      }

    return {
      id: sp.id,
      name: sp.name,
      category: sp.type,
      description: description,
      image: sp.image_url || 'https://placehold.co/600x400/0b1c30/ffffff?text=Image+Coming+Soon',
      features: features,
      categorizedSpecs: categorizedSpecs.length > 0 ? categorizedSpecs : undefined,
      usage: usage,
      brochure_url: sp.brochure_url
    };
  } catch (error) {
    console.error(`Error fetching product ${id}:`, error);
    return null;
  }
};
