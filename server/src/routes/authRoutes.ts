import { Router } from 'express';
import { authController } from '../controllers/authController';
import { authMiddleware } from '../middleware/authMiddleware';

const router = Router();

router.post('/login', authController.login);
router.post('/change-password', authMiddleware, authController.changePassword);

export default router;
