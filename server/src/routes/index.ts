import { Router } from 'express';
import productRoutes from './productRoutes';
import userRoutes from './userRoutes';
import authRoutes from './authRoutes';
import newsRoutes from './newsRoutes';
import uploadRoutes from './uploadRoutes';

const router = Router();

router.use('/products', productRoutes);
router.use('/users', userRoutes);
router.use('/auth', authRoutes);
router.use('/news', newsRoutes);
router.use('/upload', uploadRoutes);

export default router;
