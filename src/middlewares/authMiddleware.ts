import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { GenericError } from '../interfaces';

dotenv.config();

export default (req: Request, res: Response, next: NextFunction) => {
  const { authorization } = req.headers;
  const secret = process.env.JWT_SECRET as string;
  
  if (!authorization) {
    throw new GenericError('Token not found', 401);
  }
  try {
    jwt.verify(authorization as string, secret);
    req.body.user = jwt.decode(authorization); 
    next();
  } catch (e) {
    throw new GenericError('Invalid token', 401);
  }
};