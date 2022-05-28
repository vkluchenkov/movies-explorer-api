import { ServerError } from './ServerError';

export class ValidationError extends Error implements ServerError {
  public name = 'ValidationError';
  public statusCode = 400;
}
