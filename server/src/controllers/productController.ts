import type { Request, Response } from 'express';
import { productService } from '../services/productService';
import { inquiryService } from '../services/inquiryService';
import { sendProductBroadcast } from '../services/emailService';
import { asyncHandler } from '../utils/asyncHandler';

export const productController = {
  getAll: asyncHandler(async (req: Request, res: Response) => {
    const products = await productService.getAll();
    res.json(products);
  }),

  getById: asyncHandler(async (req: Request, res: Response) => {
    const product = await productService.getById(req.params.id as string);
    if (!product) {
      res.status(404).json({ error: 'Product not found' });
      return;
    }
    res.json(product);
  }),

  create: asyncHandler(async (req: Request, res: Response) => {
    const product = await productService.create(req.body);
    
    // Broadcast to all people who inquired
    try {
      const emails = await inquiryService.getAllUniqueEmails();
      if (emails.length > 0) {
        // Run in background to not block response
        sendProductBroadcast(product, emails).catch(err => {
          console.error('Failed to broadcast product email:', err);
        });
      }
    } catch (error) {
      console.error('Error fetching inquiry emails for broadcast:', error);
    }

    res.status(201).json({ 
      message: 'Product created successfully and broadcast started', 
      data: product 
    });
  }),

  update: asyncHandler(async (req: Request, res: Response) => {
    const product = await productService.update(req.params.id as string, req.body);
    res.json({
      message: 'Product updated successfully',
      data: product
    });
  }),

  delete: asyncHandler(async (req: Request, res: Response) => {
    await productService.delete(req.params.id as string);
    res.status(200).json({ message: 'Product deleted successfully' });
  })
};

