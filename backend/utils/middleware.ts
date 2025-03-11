import { NextFunction, Response, Request } from "express";
import logger from './logger';
import { User } from '../models/user';
import jwt from 'jsonwebtoken';
import { SECRET } from "./config";

/**
 * @middleware requestLogger
 * @description Logs incoming requests including the method, path, and body.
 * This helps in debugging and keeping track of all requests made to the server.
 */
export const requestLogger = (request: Request, _response: Response, next: NextFunction) => {
  logger.info(`Request: { 
      Method: ${request.method}, 
      Path: ${request.url}, 
      Body: ${JSON.stringify(request.body, null, 2)} 
  }`);
  next(); // Passes control to the next middleware
};

/**
 * @middleware unknownEndpoint
 * @description Handles requests to unknown endpoints (i.e., 404 errors).
 * This is used when a request is made to an endpoint that does not exist in the API.
 */
export const unknownEndpoint = (_request: Request, response: Response, _next: NextFunction) => {
  response.status(404).send({ error: 'unknown endpoint' }); // Sends a 404 error
};

/**
 * @middleware errorHandler
 * @description Centralized error handler for various types of errors in the application.
 * This will catch and respond to errors such as malformatted IDs, validation errors, JWT errors, etc.
 * If the error doesn't match any known type, it will pass it to the next middleware.
 */
export const errorHandler = (err: Error, _request: Request, response: Response, next: NextFunction) => {
  logger.error(err.message); // Logs the error message

  // Handling different types of errors
  if (err.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' }); // Malformed ID error
  } else if (err.name === 'ValidationError') {
    return response.status(400).json({ error: err.message }); // Validation error (e.g., bad data input)
  } else if (err.name === 'JsonWebTokenError') {
    return response.status(400).json({ error: err.message }); // Invalid JWT error
  } else if (err.name === 'TokenExpiredError') {
    return response.status(401).json({ error: 'token expired' }); // Token expiration error
  }

  // If the error doesn't match any known types, pass it to the next handler
  return next(err);
};

/**
 * @middleware tokenExtractor
 * @description Extracts the JWT token from the Authorization header of incoming requests.
 * The token should be in the form of 'Bearer <token>'.
 * If the token exists, it will be stored in `request.token`.
 */
export const tokenExtractor = (request: Request, _response: Response, next: NextFunction) => {
  const authorization = request.get('authorization'); // Get the 'Authorization' header

  // Check if the token exists and starts with 'Bearer '
  if (authorization && authorization.startsWith('Bearer ')) {
    request.token = authorization.replace('Bearer ', ''); // Remove 'Bearer ' and store just the token
  }

  next(); // Passes control to the next middleware
};

/**
 * @middleware userExtractor
 * @description Extracts the user from the decoded JWT token and attaches it to the request object.
 * The token is verified, and the user ID is extracted. The user is then fetched from the database
 * and added to the request object for later use in routes that require the user's data.
 */
export const userExtractor = async (request: Request, _response: Response, next: NextFunction) => {
  const token = request.token; // Retrieve the token from the request

  // Verify and decode the token
  if (token && SECRET) {
    const decodedToken = jwt.verify(token, SECRET); // Decode the token using the secret key
    let userId: string;

    // If the decoded token is a string (in case the token contains just the user ID)
    if (typeof decodedToken === 'string') {
      userId = decodedToken;
    } else {
      userId = decodedToken.id; // Extract the user ID from the decoded token
    }

    // Fetch the user from the database
    const user = await User.findById(userId);
    if (user !== null) {
      request.user = user; // Attach the user to the request object
    }
  }

  next(); // Passes control to the next middleware or route handler
};