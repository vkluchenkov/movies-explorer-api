import { verify } from 'jsonwebtoken';
import { config } from 'dotenv';
import { Response, Request, NextFunction } from 'express';
import UnauthorizedError from '../errors/UnauthorizedError';
import devConfig from '../devConfig';
import { errorMessages } from '../utils/messages';

config();
const { NODE_ENV, JWT_SECRET } = process.env;

const auth = (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.cookies.jwt;
    if (!token) throw new UnauthorizedError(errorMessages.incorrectToken);

    const secret = NODE_ENV === 'production' && JWT_SECRET ? JWT_SECRET : devConfig.devSecret;
    const payload = verify(token, secret);
    if (!payload) throw new UnauthorizedError(errorMessages.incorrectToken);
    req.user = payload as Object;
    next();
  } catch (err) {
    next(err);
  }
};

export default auth;
