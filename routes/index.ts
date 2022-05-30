import { Router } from 'express';
import auth from '../middlwares/auth';
import Users from './users';
import Movies from './movies';
import OpenRoutes from './open';
import NotFoundError from '../errors/NotFoundError';
import { errorMessages } from '../utils/messages';

const router = Router();

// Open routes
router.use(OpenRoutes);

// Guarded routes
router.use(auth);
router.use(Users);
router.use(Movies);

// Incorrect route handler
router.use((req, res, next) => next(new NotFoundError(errorMessages.routeNotFound)));

export default router;
