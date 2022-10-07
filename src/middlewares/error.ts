import { NextFunction, Request, Response } from 'express';
import { GenericError } from '../interfaces';

export default (err: GenericError, req: Request, res: Response, _next: NextFunction) => {
  const { message, statusCode } = err;
  if (statusCode) {
    return res.status(statusCode).json({ message });
  }
  return res.status(500).end();
};