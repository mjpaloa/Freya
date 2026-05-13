import { Router } from 'express';
import { newsController } from '../controllers/newsController';
import { authMiddleware } from '../middleware/authMiddleware';

const router = Router();

// Public routes
router.get('/', newsController.getAll);
router.get('/:id', newsController.getById);

// Protected routes (Admin only)
router.use(authMiddleware);
router.post('/', newsController.create);
router.put('/:id', newsController.update);
router.delete('/:id', newsController.delete);

export default router;
