import { Router } from 'express';
import { getMe, signout, updateMe } from '../controllers/users';
import { updateUserValidator } from '../middlwares/validator';

const Users = Router();

Users.get('/users/me', getMe);
Users.patch('/users/me', updateUserValidator, updateMe);
Users.get('/signout', signout);

export default Users;
