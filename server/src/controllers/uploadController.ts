import { type Request, type Response } from 'express';
import { storageService } from '../services/storageService';
import { asyncHandler } from '../utils/asyncHandler';

export const uploadController = {
  uploadBrochure: asyncHandler(async (req: Request, res: Response) => {
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
  }),

  uploadImage: asyncHandler(async (req: Request, res: Response) => {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    // Check if file is an image
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
    if (!allowedTypes.includes(req.file.mimetype)) {
      return res.status(400).json({ error: 'Only JPEG, PNG, and WebP images are allowed' });
    }

    // Upload to 'images' bucket
    const publicUrl = await storageService.uploadFile(req.file, 'images');
    res.json({ url: publicUrl });
  })
};

