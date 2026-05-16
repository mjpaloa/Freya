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
      let usage = '';

      if (infoText.includes('[DESCRIPTION]')) {
        description = infoText.split('[TECHNICAL SPECS]')[0]?.replace('[DESCRIPTION]', '').trim() || infoText;
        const specsPart = infoText.split('[TECHNICAL SPECS]')[1] || '';
        const specs = specsPart.split('[USAGE]')[0]?.trim() || '';
        usage = specsPart.split('[USAGE]')[1]?.trim() || '';
        
        if (specs) {
          features = specs.split('\n').map(s => s.trim().replace(/^-/, '').trim()).filter(s => s !== '');
        }
      }

      return {
        id: sp.id,
        name: sp.name,
        category: sp.type,
        description: description,
        image: sp.image_url || 'https://placehold.co/600x400/0b1c30/ffffff?text=Image+Coming+Soon',
        features: features,
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
    let usage = '';

    if (infoText.includes('[DESCRIPTION]')) {
      description = infoText.split('[TECHNICAL SPECS]')[0]?.replace('[DESCRIPTION]', '').trim() || infoText;
      const specsPart = infoText.split('[TECHNICAL SPECS]')[1] || '';
      const specs = specsPart.split('[USAGE]')[0]?.trim() || '';
      usage = specsPart.split('[USAGE]')[1]?.trim() || '';
      
      if (specs) {
        features = specs.split('\n').map(s => s.trim().replace(/^-/, '').trim()).filter(s => s !== '');
      }
    }

    return {
      id: sp.id,
      name: sp.name,
      category: sp.type,
      description: description,
      image: sp.image_url || 'https://placehold.co/600x400/0b1c30/ffffff?text=Image+Coming+Soon',
      features: features,
      usage: usage,
      brochure_url: sp.brochure_url
    };
  } catch (error) {
    console.error(`Error fetching product ${id}:`, error);
    return null;
  }
};
