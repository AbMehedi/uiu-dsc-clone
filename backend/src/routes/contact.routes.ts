import { Router } from 'express';
import {
  submitContact,
  getAllSubmissions,
  markAsRead,
} from '../controllers/contact.controller';
import { authMiddleware } from '../middleware/auth.middleware';

const router = Router();

// Public route
router.post('/', submitContact);

// Protected routes
router.get('/', authMiddleware, getAllSubmissions);
router.put('/:id', authMiddleware, markAsRead);

export default router;

