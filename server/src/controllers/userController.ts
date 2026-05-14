import type { Request, Response } from 'express';
import { userService } from '../services/userService';
import { asyncHandler } from '../utils/asyncHandler';

export const userController = {
  getAll: asyncHandler(async (req: Request, res: Response) => {
    const users = await userService.getAll();
    res.json(users);
  }),

  getById: asyncHandler(async (req: Request, res: Response) => {
    const user = await userService.getById(req.params.id as string);
    if (!user) {
      res.status(404).json({ error: 'User not found' });
      return;
    }
    res.json(user);
  }),

  create: asyncHandler(async (req: Request, res: Response) => {
    const user = await userService.create(req.body);
    res.status(201).json({
      message: 'User created successfully',
      data: user
    });
  }),

  update: asyncHandler(async (req: Request, res: Response) => {
    const user = await userService.update(req.params.id as string, req.body);
    res.json({
      message: 'User updated successfully',
      data: user
    });
  }),

  delete: asyncHandler(async (req: Request, res: Response) => {
    await userService.delete(req.params.id as string);
    res.status(200).json({ message: 'User deleted successfully' });
  })
};

