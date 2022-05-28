import { Router } from 'express';
import { getMe, updateMe } from '../controllers/users';
import { updateUserValidator } from '../middlwares/validator';

const Users = Router();

Users.get('/me', getMe);
Users.patch('/me', updateUserValidator, updateMe);

export default Users;
