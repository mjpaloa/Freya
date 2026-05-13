import { Router } from 'express';
import { productController } from '../controllers/productController';
import { authMiddleware } from '../middleware/authMiddleware';

const router = Router();

// Public routes
router.get('/', productController.getAll);
router.get('/:id', productController.getById);

// Protected routes (Admin only)
router.use(authMiddleware);
router.post('/', productController.create);
router.put('/:id', productController.update);
router.delete('/:id', productController.delete);

export default router;
