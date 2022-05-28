import { verify } from 'jsonwebtoken';
import { config } from 'dotenv';
import { Response, Request, NextFunction } from 'express';
import UnauthorizedError from '../errors/UnauthorizedError';

config();
const { NODE_ENV, JWT_SECRET } = process.env;

const auth = (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.cookies.jwt;
    if (!token) throw new UnauthorizedError('Incorrect or missing token');

    const secret = NODE_ENV === 'production' && JWT_SECRET ? JWT_SECRET : 'dev-secret';
    const payload = verify(token, secret);
    if (!payload) throw new UnauthorizedError('Incorrect or missing token');
    req.user = payload as Object;
    next();
  } catch (err) {
    next(err);
  }
};

export default auth;
