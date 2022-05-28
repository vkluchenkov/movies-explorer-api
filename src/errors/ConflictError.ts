import ServerError from './ServerError';

class ConflictError extends Error implements ServerError {
  public statusCode = 409;

  public name = 'ConflictError';
}

export default ConflictError;
