import { Router } from 'express';
import { signin, signout, signup } from '../controllers/users';
import { auth } from '../middlwares/auth';
import { Users } from './users';
import { Movies } from './movies';
import { NotFoundError } from '../errors/NotFoundError';
import { signinValidator, signupValidator } from '../middlwares/validator';

export const router = Router();

// Open routes
router.post('/signin', signinValidator, signin);
router.post('/signup', signupValidator, signup);

// Guarded routes
router.use(auth);
router.use('/users', Users);
router.use('/movies', Movies);
router.get('/signout', signout);

// Incorrect route handler
router.use((req, res, next) => next(new NotFoundError('Route not found')));
