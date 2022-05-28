import ServerError from './ServerError';

class NotFoundError extends Error implements ServerError {
  public name = 'NotFoundError';

  public statusCode = 404;
}
export default NotFoundError;
