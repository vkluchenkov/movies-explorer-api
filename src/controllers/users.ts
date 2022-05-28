import { Request, Response, NextFunction } from 'express';
import { config } from 'dotenv';
import { sign } from 'jsonwebtoken';
import { compare, hash } from 'bcryptjs';
import { LoginPayload, PatchMePayload, SignupPayload } from './types';
import { UserModel } from '../models/user';
import { UnauthorizedError } from '../errors/UnauthorizedError';
import { ValidationError } from '../errors/ValidationError';
import { ConflictError } from '../errors/ConflictError';
import { NotFoundError } from '../errors/NotFoundError';

config();
const { NODE_ENV, JWT_SECRET } = process.env;
const secret = NODE_ENV === 'production' && JWT_SECRET ? JWT_SECRET : 'dev-secret';

export const signin = async (req: Request, res: Response, next: NextFunction) => {
  const { email, password }: LoginPayload = req.body;
  try {
    const user = await UserModel.findOne({ email }).select('+password');
    if (!user) throw new UnauthorizedError('Incorrect credentials');
    else {
      const match = await compare(password, user.password);
      if (!match) throw new UnauthorizedError('Incorrect credentials');
      else {
        const token = sign({ _id: user._id }, secret, { expiresIn: '7d' });
        const dto = { email: user.email, name: user.name, _id: user._id };
        res
          .cookie('jwt', token, {
            maxAge: 3600000 * 24 * 7,
            httpOnly: true,
          })
          .send(dto)
          .end();
      }
    }
  } catch (err) {
    next(err);
  }
};

export const signup = async (req: Request, res: Response, next: NextFunction) => {
  const { email, name, password }: SignupPayload = req.body;
  try {
    const hashedPass = await hash(password, 10);
    const user = await UserModel.create({ email, name, password: hashedPass });
    const token = sign({ _id: user._id }, secret, { expiresIn: '7d' });
    const dto = { email: user.email, name: user.name, _id: user._id };
    res
      .cookie('jwt', token, {
        maxAge: 3600000 * 24 * 7,
        httpOnly: true,
      })
      .send(dto)
      .end();
  } catch (err: any) {
    if (err.code === 11000) {
      next(new ConflictError('User with this email already exists'));
    } else if (err.name === 'ValidationError' || err.name === 'CastError') {
      next(new ValidationError('Incorrect data'));
      next(err);
    }
  }
};

export const signout = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await UserModel.findById(req.user!._id);
    if (user) {
      res.clearCookie('jwt');
      res.send({ message: 'Succesfully signed out' });
    }
  } catch (err) {
    next(err);
  }
};

export const getMe = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await UserModel.findById(req.user!._id);
    if (user) {
      const dto = { email: user.email, name: user.name, _id: user._id };
      res.send(dto);
    }
  } catch (err) {
    next(err);
  }
};

export const updateMe = async (req: Request, res: Response, next: NextFunction) => {
  const { name, email }: PatchMePayload = req.body;
  try {
    const user = await UserModel.findByIdAndUpdate(
      req.user!._id,
      { name, email },
      { new: true, runValidators: true },
    );
    if (user) {
      const dto = { email: user.email, name: user.name, _id: user._id };
      res.send(dto);
    } else throw new NotFoundError('User not found');
  } catch (err: any) {
    if (err.code === 11000) {
      next(new ConflictError('User with this email already exists'));
    } else if (err.name === 'ValidationError' || err.name === 'CastError') {
      next(new ValidationError('Incorrect data'));
      next(err);
    }
  }
};
