import { Router } from 'express';
import moviesRouter from './Movies';

// Init router and path
const router = Router();

// Add sub-routes
router.use('/movies', moviesRouter);

// Export the base-router
export default router;
