import ServerError from './ServerError';

class ValidationError extends Error implements ServerError {
  public name = 'ValidationError';

  public statusCode = 400;
}

export default ValidationError;
