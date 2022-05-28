import ServerError from './ServerError';

class ForbiddenError extends Error implements ServerError {
  public name = 'ForbiddenError';

  public statusCode = 403;
}

export default ForbiddenError;
