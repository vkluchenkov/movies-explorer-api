import * as express from 'express';
import * as cookieParser from 'cookie-parser';
import { json, urlencoded } from 'body-parser';
import { connect } from 'mongoose';
import helmet from 'helmet';
import { config } from 'dotenv';
import { errors } from 'celebrate';

import cors from './middlwares/cors';
import { requestLogger, errorLogger } from './middlwares/logger';
import handleError from './errors/handleError';
import router from './routes';
import limiter from './middlwares/limiter';
import devConfig from './devConfig';
import ServerError from './errors/ServerError';

const app = express();

// Helmet and limiter
app.use(helmet());
app.use(limiter);

// ENV constants
config();
const PORT = process.env.PORT || 3000;
const { NODE_ENV, DB } = process.env;

// Parsers
app.use(json());
app.use(urlencoded({ extended: true }));
app.use(cookieParser());

// Database
const dbUrl = NODE_ENV === 'production' && DB ? DB : devConfig.devDb;
connect(dbUrl);

// Request logger
app.use(requestLogger);

// CORS
app.use(cors);

// Router
app.use(router);

// Errors logger
app.use(errorLogger);

// Joi errors
app.use(errors());

// Errors handler
app.use(
  (
    err: Error | ServerError,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
  ) => handleError({
    err,
    req,
    res,
    next,
  }),
);

app.listen(PORT);
