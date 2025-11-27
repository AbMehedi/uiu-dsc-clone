import { Router } from 'express';
import { login, logout, getMe } from '../controllers/auth.controller';
import { authMiddleware } from '../middleware/auth.middleware';

const router = Router();

// Public routes
router.post('/login', login);
router.post('/logout', logout);

// Protected route
router.get('/me', authMiddleware, getMe);

export default router;

