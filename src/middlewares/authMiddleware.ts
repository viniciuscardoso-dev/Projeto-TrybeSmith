import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

export default (req: Request, res: Response, next: NextFunction) => {
  const { token } = req.headers;

  try {
    // jwt.verify(token as string, process.env.JWT_SECRET);
    jwt.verify(token as string, 'secret');
    next();
  } catch (error) {
    next(error);
  }
};