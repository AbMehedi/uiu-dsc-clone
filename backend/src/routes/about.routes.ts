import { Router } from 'express';
import { getAbout, updateAbout } from '../controllers/about.controller';
import { authMiddleware } from '../middleware/auth.middleware';

const router = Router();

// Public route
router.get('/', getAbout);

// Protected route
router.put('/', authMiddleware, updateAbout);

export default router;

