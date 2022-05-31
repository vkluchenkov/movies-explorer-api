import ServerError from './ServerError';

class UnauthorizedError extends Error implements ServerError {
  public name = 'UnauthorizedError';

  public statusCode = 401;
}

export default UnauthorizedError;
