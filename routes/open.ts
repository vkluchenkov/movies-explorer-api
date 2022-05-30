import { Router } from 'express';
import { signin, signup } from '../controllers/users';
import { signinValidator, signupValidator } from '../middlwares/validator';

const OpenRoutes = Router();

OpenRoutes.post('/signin', signinValidator, signin);
OpenRoutes.post('/signup', signupValidator, signup);

export default OpenRoutes;
