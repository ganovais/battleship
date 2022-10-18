import { Router } from 'express'
import positionRoutes from './position.routes';
import userRoutes from './user.routes';

const router = Router();

router.use('/positions', positionRoutes);
router.use('/users', userRoutes);


export default router;
