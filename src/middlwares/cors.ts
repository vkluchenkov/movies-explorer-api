import { Request, Response, NextFunction } from 'express';

const allowedCors = ['http://localhost:3001', 'https://mesto.bestpicture.pro'];

export const cors = (req: Request, res: Response, next: NextFunction) => {
  const { method } = req;
  const { origin } = req.headers;

  const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';
  const requestHeaders = req.headers['access-control-request-headers'];

  res.header('Access-Control-Allow-Credentials', 'true');

  if (origin && allowedCors.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
  }

  if (method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS);
    res.header('Access-Control-Allow-Headers', requestHeaders);
    return res.end();
  }
  next();
  return null;
};
