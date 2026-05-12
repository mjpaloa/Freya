import type { Request, Response } from 'express';
import { productService } from '../services/productService';

export const productController = {
  async getAll(req: Request, res: Response) {
    try {
      const products = await productService.getAll();
      res.json(products);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  },

  async getById(req: Request, res: Response) {
    try {
      const product = await productService.getById(req.params.id as string);
      if (!product) {
         res.status(404).json({ error: 'Product not found' });
         return;
      }
      res.json(product);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  },

  async create(req: Request, res: Response) {
    try {
      const product = await productService.create(req.body);
      res.status(201).json({ 
        message: 'Product created successfully', 
        data: product 
      });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  },

  async update(req: Request, res: Response) {
    try {
      const product = await productService.update(req.params.id as string, req.body);
      res.json({ 
        message: 'Product updated successfully', 
        data: product 
      });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  },

  async delete(req: Request, res: Response) {
    try {
      await productService.delete(req.params.id as string);
      res.status(200).json({ message: 'Product deleted successfully' });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }
};
