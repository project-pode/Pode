import { NextFunction, Response, Request } from "express";

import logger from './logger';
import { User } from '../models/user';
import jwt from 'jsonwebtoken';
import { SECRET } from "./config";

export const requestLogger = (request: Request, _response: Response, next: NextFunction) => {
  logger.info(`Request: { 
      Method: ${request.method}, 
      Path: ${request.url}, 
      Body: ${JSON.stringify(request.body, null, 2)} 
  }`);
  next();
};


export const unknownEndpoint = (_request : Request, response : Response, _next: NextFunction) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

export const errorHandler = (err: Error, _request : Request, response : Response, next: NextFunction) => {
  logger.error(err.message)

  if (err.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (err.name === 'ValidationError') {
    return response.status(400).json({ error: err.message })
  } else if (err.name ===  'JsonWebTokenError') {
    return response.status(400).json({ error: err.message })
  } else if (err.name === 'TokenExpiredError') {
    return response.status(401).json({
      error: 'token expired'    })
  }

  return next(err)
}

export const tokenExtractor = (request : Request, _response : Response, next: NextFunction) =>{
    const authorization = request.get('authorization') //get token
    if (authorization && authorization.startsWith('Bearer ')){
      request.token= authorization.replace('Bearer ', '') //remove bearer to only include token
      }

next()
}

export const userExtractor = async (request: Request, _response: Response, next: NextFunction) => {
  const token = request.token;
  if (token && SECRET) {
    const decodedToken = jwt.verify(token, SECRET);
    let userId: string;
    if (typeof decodedToken === 'string') {
      userId = decodedToken;
    } else {
      userId = decodedToken.id;
    }
    const user = await User.findById(userId);
    if (user !== null) {
      request.user = user;
    }
  }
  next();
};