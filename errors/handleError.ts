import { errorMessages } from '../utils/messages';
import { HandleErrorArgs } from './types';

const handleError = (args: HandleErrorArgs) => {
  const statusCode = args.err.statusCode || 500;
  const message = args.err.statusCode ? args.err.message : errorMessages.serverError;
  args.res.status(statusCode).send({ message });
};

export default handleError;
