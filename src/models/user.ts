import * as mongoose from 'mongoose';
import isEmail from 'validator/lib/isEmail';
import { User } from '../controllers/types';

const userSchema = new mongoose.Schema<User>({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
    validate: [isEmail, 'Incorrect email'],
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
});

export const UserModel = mongoose.model<User>('user', userSchema);
