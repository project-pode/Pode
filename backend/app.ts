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

// Import error-handling and request-middleware functions
import { ErrorRequestHandler } from 'express';
import { requestLogger, unknownEndpoint, tokenExtractor, userExtractor } from './utils/middleware';
import { errorHandler } from './utils/middleware';
import exercisesRouter from './controllers/exercises';  // Router for exercise-related routes
import logger from "./utils/logger";  // Logger utility to log messages

// Extend the Express Request type to include 'user' and 'token' for all requests
declare global {
  namespace Express {
    interface Request {
      user: IUser  // Attach the IUser type to the request object for user-related data
      token: string  // Attach the JWT token to the request object for authorization
    }
  }
}

logger.info(`connecting to ${MONGODB_URI}`); 

if (MONGODB_URI) {
  mongoose.connect(MONGODB_URI) 
    .then(() => {
      logger.info('connected to MongoDB'); 
    })
    .catch((error) => {
      logger.error(`error connecting to MongoDB: ${error.message}`);
    });
} else {
  // If MONGODB_URI is not defined, log an error message
  logger.error('MONGODB_URI is not defined');
}

// Middleware setup
app.use(cors());  
app.use(express.json()); 
app.use(requestLogger); 
app.use(tokenExtractor); 

// Set up the API route handlers with the necessary middlewares
app.use('/api/login', loginRouter); 
app.use('/api/users', userExtractor, usersRouter); 
app.use('/api/lessons', userExtractor, lessonsRouter, exercisesRouter);  

// Handle unknown endpoints with a 404 error message
app.use(unknownEndpoint);

// Set up a centralized error handler for all routes
app.use(errorHandler as ErrorRequestHandler); 

export default app;