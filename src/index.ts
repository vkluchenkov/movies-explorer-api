import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as cookieParser from 'cookie-parser';
import * as mongoose from 'mongoose';
import { config } from 'dotenv';
import { errors } from 'celebrate';

import { cors } from './middlwares/cors';
import { requestLogger, errorLogger } from './middlwares/logger';
import { handleError } from './errors/handleError';
import { router } from './routes';

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

// Router
app.use(router);

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
