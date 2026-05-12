import type { Request, Response } from 'express';
import { authService } from '../services/authService';

export const authController = {
  async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      const result = await authService.login(email, password);
      res.json({
        message: 'Login successful',
        ...result
      });
    } catch (error: any) {
      res.status(401).json({ error: error.message });
    }
  }
};
