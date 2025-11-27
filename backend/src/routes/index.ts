import { Router } from 'express';
import eventRoutes from './events.routes';
import aboutRoutes from './about.routes';
import contactRoutes from './contact.routes';
import authRoutes from './auth.routes';

const router = Router();

// API routes
router.use('/events', eventRoutes);
router.use('/about', aboutRoutes);
router.use('/contact', contactRoutes);
router.use('/auth', authRoutes);

export default router;

