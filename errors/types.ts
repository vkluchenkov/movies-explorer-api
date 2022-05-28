import * as express from 'express';
import ServerError from './ServerError';

export interface HandleErrorArgs {
  err: Error | ServerError;
  req: express.Request;
  res: express.Response;
  next: express.NextFunction;
}
