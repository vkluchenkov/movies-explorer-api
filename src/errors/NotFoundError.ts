import { ServerError } from './ServerError';

export class NotFoundError extends Error implements ServerError {
  public name = 'NotFoundError';
  public statusCode = 404;
}
