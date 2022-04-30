import { Router } from 'express';
import usersRouter from './User';
import departmentRouter from './Department';

// Init router and path
const router = Router();

// Add sub-routes
router.use('/users', usersRouter);
router.use('/department', departmentRouter);

// Export the base-router
export default router;
