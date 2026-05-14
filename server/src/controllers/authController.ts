import type { Request, Response } from 'express';
import { authService } from '../services/authService';
import { asyncHandler } from '../utils/asyncHandler';

export const authController = {
  login: asyncHandler(async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const result = await authService.login(email, password);
    res.json({
      message: 'Login successful',
      ...result
    });
  })
};
