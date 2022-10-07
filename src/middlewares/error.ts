import { NextFunction, Request, Response } from 'express';
import { GenericError } from '../interfaces';

export default (err: GenericError, req: Request, res: Response, _next: NextFunction) => {
  const { message, statusCode } = err;
  let status = 500;
  if (statusCode) {
    return res.status(statusCode).json({ message });
  }
  if (message.includes('required')) {
    status = 400;
  } else {
    status = 422;
  }
  return res.status(status).json({ message });
};