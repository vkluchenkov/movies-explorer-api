import { ServerError } from './ServerError';

export class ForbiddenError extends Error implements ServerError {
  public name = 'ForbiddenError';
  public statusCode = 403;
}
