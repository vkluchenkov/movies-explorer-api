import { rateLimit } from 'express-rate-limit';

const limiter = rateLimit({
  windowMs: 1000 * 60 * 5,
  max: 300,
});

export default limiter;
