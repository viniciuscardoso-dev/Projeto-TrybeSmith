import { NextFunction, Request, Response } from 'express';
import { GenericError } from '../interfaces';

export default (err: GenericError, req: Request, res: Response, _next: NextFunction) => {
  const { message, statusCode } = err;
  if (statusCode) {
    return res.status(statusCode).json({ message });
  }
  switch (message) {
    case '"name" is required':
      res.status(400).json({ message });
      break;
    case '"amount" is required':
      res.status(400).json({ message });
      break;
    default:
      res.status(422).json({ message });
      break;
  }
  return res.status(500).end();
};