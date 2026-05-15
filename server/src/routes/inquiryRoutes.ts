import { Router } from 'express';
import { createInquiry, getInquiries, updateInquiryStatus, sendReply } from '../controllers/inquiryController';

const router = Router();

// Public submission endpoint
router.post('/', createInquiry);

// Admin-only endpoints (TODO: Add auth middleware)
router.get('/', getInquiries);
router.patch('/:id/status', updateInquiryStatus);
router.post('/:id/reply', sendReply);

export default router;
