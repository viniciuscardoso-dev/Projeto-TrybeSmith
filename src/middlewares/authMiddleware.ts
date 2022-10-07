import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export default (req: Request, res: Response, next: NextFunction) => {
  const { token } = req.headers;

  try {
    const secret = process.env.JWT_SECRET as string;
    jwt.verify(token as string, secret);
    next();
  } catch (error) {
    next(error);
  }
};