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
  }),

  changePassword: asyncHandler(async (req: Request, res: Response) => {
    const { current_password, new_password } = req.body;
    // @ts-ignore - user added by middleware
    const userId = req.user.id;
    
    await authService.changePassword(userId, current_password, new_password);
    res.json({ message: 'Password changed successfully' });
  })
};
