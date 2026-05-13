export interface Product {
  id: string;
  name: string;
  category: string;
  description: string;
  image: string;
  features: string[];
  usage?: string;
  brochure_url?: string;
}

export const products: Product[] = [];
