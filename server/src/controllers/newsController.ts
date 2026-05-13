import type { Request, Response } from 'express';
import { newsService } from '../services/newsService';

export const newsController = {
  async getAll(req: Request, res: Response) {
    try {
      const articles = await newsService.getAll();
      res.json(articles);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  },

  async getById(req: Request, res: Response) {
    try {
      const article = await newsService.getById(req.params.id as string);
      if (!article) {
         res.status(404).json({ error: 'Article not found' });
         return;
      }
      res.json(article);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  },

  async create(req: Request, res: Response) {
    try {
      const article = await newsService.create(req.body);
      res.status(201).json({ 
        message: 'Article created successfully', 
        data: article 
      });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  },

  async update(req: Request, res: Response) {
    try {
      const article = await newsService.update(req.params.id as string, req.body);
      res.json({ 
        message: 'Article updated successfully', 
        data: article 
      });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  },

  async delete(req: Request, res: Response) {
    try {
      await newsService.delete(req.params.id as string);
      res.status(200).json({ message: 'Article deleted successfully' });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }
};
