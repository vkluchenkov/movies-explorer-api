import { HandleErrorArgs } from './types';

export const handleError = (args: HandleErrorArgs) => {
  const statusCode = args.err.statusCode || 500;
  console.log(args.err);
  const message = args.err.message || 'Server error';
  args.res.status(statusCode).send({ message });
};
