import { Request, Response, NextFunction } from 'express';
import { config } from 'dotenv';
import devConfig from '../../devConfig';

config();

const { NODE_ENV, ALLOWED_CORS } = process.env;

const allowedCors = NODE_ENV === 'production' && ALLOWED_CORS ? ALLOWED_CORS : devConfig.devAllowedCors;

const cors = (req: Request, res: Response, next: NextFunction) => {
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

export default cors;
