import { Router } from 'express';
import { celebrate, Joi } from 'celebrate';
import { getMe, updateMe } from '../controllers/users';

export const Users = Router();

Users.get('/me', getMe);

Users.patch(
  '/me',
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().min(2).max(30),
      email: Joi.string().email(),
    }),
  }),
  updateMe
);
