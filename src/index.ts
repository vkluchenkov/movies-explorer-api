import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as cookieParser from 'cookie-parser';
import * as mongoose from 'mongoose';
import { config } from 'dotenv';

import { auth } from './middlwares/auth';
import { celebrate, Joi, errors } from 'celebrate';

import { cors } from './middlwares/cors';
import { requestLogger, errorLogger } from './middlwares/logger';
import { Users } from './routes/users';
import { Movies } from './routes/movies';
import { signin, signout, signup } from './controllers/users';
import { NotFoundError } from './errors/NotFoundError';
import { handleError } from './errors/handleError';

const app = express();

// ENV constants
config();
const PORT = process.env.PORT || 3000;
const { NODE_ENV, DB } = process.env;

// Parsers
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

// Database
const dbUrl = NODE_ENV === 'production' && DB ? DB : 'mongodb://localhost:27017/moviesdb';
mongoose.connect(dbUrl);

// Request logger
app.use(requestLogger);

// CORS
app.use(cors);

// Open routes
app.post(
  '/signin',
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    }),
  }),
  signin
);

app.post(
  '/signup',
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().min(2).max(30),
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    }),
  }),
  signup
);

// Guarded routes
app.use(auth);
app.use('/users', Users);
app.use('/movies', Movies);
app.get('/signout', signout);

// Incorrect route handler
app.use((req, res, next) => next(new NotFoundError('Route not found')));

// Errors logger
app.use(errorLogger);

// Joi errors
app.use(errors());

// Errors handler
app.use(
  (
    err: Error & { statusCode?: number },
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => handleError({ err, req, res, next })
);

app.listen(PORT, () => console.log(`Server started on port ${PORT} :)`));
