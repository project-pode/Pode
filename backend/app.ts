// Import necessary modules and dependencies
import { IUser } from "./models/user";  // IUser interface to define the user object structure
import { MONGODB_URI } from './utils/config';  // MongoDB URI for database connection
import express from 'express';  // Express web framework
require('express-async-errors');  // Allows async/await in route handlers to propagate errors
const app = express();  // Create an Express app instance
import cors from 'cors';  // Middleware for enabling Cross-Origin Resource Sharing (CORS)
import mongoose from 'mongoose';  // MongoDB object modeling tool
import loginRouter from './controllers/login';  // Router for login-related routes
import usersRouter from './controllers/users';  // Router for user-related routes
import lessonsRouter from './controllers/lessons';  // Router for lessons-related routes

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

// Log the MongoDB URI to ensure it is being used properly
logger.info('connecting to', MONGODB_URI);

// Check if MONGODB_URI is defined and attempt to connect to the MongoDB database
if (MONGODB_URI) {
  mongoose.connect(MONGODB_URI)  // Connect to MongoDB using the provided URI
    .then(() => {
      logger.info('connected to MongoDB');  // Log success if connection is successful
    })
    .catch((error) => {
      logger.error('error connecting to MongoDB:', error.message);  // Log error if connection fails
    });
} else {
  // If MONGODB_URI is not defined, log an error message
  logger.error('MONGODB_URI is not defined');
}

// Middleware setup
app.use(cors());  // Enable CORS for all incoming requests
app.use(express.json());  // Parse incoming JSON requests
app.use(requestLogger);  // Log details of incoming requests for debugging and monitoring
app.use(tokenExtractor);  // Extract JWT token from the request header

// Set up the API route handlers with the necessary middlewares
app.use('/api/login', loginRouter);  // Login routes
app.use('/api/users', userExtractor, usersRouter);  // Users routes, with userExtractor middleware to identify the user
app.use('/api/lessons', userExtractor, lessonsRouter, exercisesRouter);  // Lessons and exercises routes

// Handle unknown endpoints with a 404 error message
app.use(unknownEndpoint);

// Set up a centralized error handler for all routes
app.use(errorHandler as ErrorRequestHandler);  // Use the custom error handler to catch all errors

// Export the Express app for use in other parts of the application
export default app;