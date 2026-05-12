import { Router } from 'express';
import productRoutes from './productRoutes';
import userRoutes from './userRoutes';
import authRoutes from './authRoutes';

const router = Router();

router.use('/products', productRoutes);
router.use('/users', userRoutes);
router.use('/auth', authRoutes);

export default router;
