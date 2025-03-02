import { IUser } from "./models/user";
import { MONGODB_URI } from './utils/config';
import express from 'express';
require('express-async-errors');
const app = express();
import cors from 'cors';
import mongoose from 'mongoose';
import loginRouter from './controllers/login';
import usersRouter from './controllers/users';
import lessonsRouter from './controllers/lessons';

import { ErrorRequestHandler } from 'express';
import { requestLogger, unknownEndpoint, tokenExtractor, userExtractor } from './utils/middleware';
import { errorHandler } from './utils/middleware';
import exercisesRouter from './controllers/exercises';
import logger from "./utils/logger";

declare global {
  namespace Express {
    interface Request {
      user: IUser
      token: string
    }
  }
}

logger.info('connecting to', MONGODB_URI);

if (MONGODB_URI) {
  mongoose.connect(MONGODB_URI)
    .then(() => {
      logger.info('connected to MongoDB');
    })
    .catch((error) => {
      logger.error('error connecting to MongoDB:', error.message);
    });
} else {
  logger.error('MONGODB_URI is not defined');
}

app.use(cors());

app.use(express.json());
app.use(requestLogger);
app.use(tokenExtractor);

app.use('/api/login', loginRouter);
app.use('/api/users', userExtractor, usersRouter);
app.use('/api/lessons', userExtractor, lessonsRouter, exercisesRouter);

app.use(unknownEndpoint);
app.use(errorHandler as ErrorRequestHandler);

export default app