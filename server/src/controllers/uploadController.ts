import { type Request, type Response } from 'express';
import { storageService } from '../services/storageService';

export const uploadController = {
  async uploadBrochure(req: Request, res: Response) {
    try {
      if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded' });
      }

      // Check if file is PDF
      if (req.file.mimetype !== 'application/pdf') {
        return res.status(400).json({ error: 'Only PDF files are allowed for brochures' });
      }

      // Upload to 'brochures' bucket
      const publicUrl = await storageService.uploadFile(req.file, 'brochures');

      res.json({ url: publicUrl });
    } catch (error: any) {
      console.error('Upload error:', error);
      res.status(500).json({ error: error.message });
    }
  },

  async uploadImage(req: Request, res: Response) {
    try {
      if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded' });
      }

      // Upload to 'images' bucket
      const publicUrl = await storageService.uploadFile(req.file, 'images');

      res.json({ url: publicUrl });
    } catch (error: any) {
      console.error('Upload error:', error);
      res.status(500).json({ error: error.message });
    }
  }
};
