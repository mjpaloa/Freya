import type { Request, Response } from 'express';
import { newsService } from '../services/newsService';
import { userService } from '../services/userService';
import { sendNewsBroadcast } from '../services/emailService';
import { asyncHandler } from '../utils/asyncHandler';

export const newsController = {
  getAll: asyncHandler(async (req: Request, res: Response) => {
    const articles = await newsService.getAll();
    res.json(articles);
  }),

  getById: asyncHandler(async (req: Request, res: Response) => {
    const article = await newsService.getById(req.params.id as string);
    if (!article) {
      res.status(404).json({ error: 'Article not found' });
      return;
    }
    res.json(article);
  }),

  create: asyncHandler(async (req: Request, res: Response) => {
    const article = await newsService.create(req.body);
    
    // Broadcast to all users
    try {
      const users = await userService.getAll();
      const userEmails = users.map(u => u.email).filter(Boolean) as string[];
      if (userEmails.length > 0) {
        // Run in background to not block response
        sendNewsBroadcast(article, userEmails).catch(err => {
          console.error('Failed to broadcast news email:', err);
        });
      }
    } catch (error) {
      console.error('Error fetching users for broadcast:', error);
    }

    res.status(201).json({ 
      message: 'Article created successfully and broadcast started', 
      data: article 
    });
  }),

  update: asyncHandler(async (req: Request, res: Response) => {
    const article = await newsService.update(req.params.id as string, req.body);
    res.json({
      message: 'Article updated successfully',
      data: article
    });
  }),

  delete: asyncHandler(async (req: Request, res: Response) => {
    await newsService.delete(req.params.id as string);
    res.status(200).json({ message: 'Article deleted successfully' });
  })
};

