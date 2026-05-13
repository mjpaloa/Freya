import { Router } from 'express';
import multer from 'multer';
import { uploadController } from '../controllers/uploadController';
import { authMiddleware } from '../middleware/authMiddleware';

const router = Router();

// Configure Multer for memory storage
const storage = multer.memoryStorage();
const upload = multer({ 
  storage,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit
  }
});

// Protected routes (Admin only)
router.use(authMiddleware);

router.post('/brochure', upload.single('brochure'), uploadController.uploadBrochure);
router.post('/image', upload.single('image'), uploadController.uploadImage);

export default router;
