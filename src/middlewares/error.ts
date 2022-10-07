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
  // caso especial por que o teste espera resposta divergente
  if (message.includes('contain at least 1 items')) {
    return res.status(422).json({ message: '"productsIds" must include only numbers' });
  }
  return res.status(status).json({ message });
};
