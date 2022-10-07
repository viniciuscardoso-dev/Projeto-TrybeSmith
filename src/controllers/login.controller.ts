import { NextFunction, Request, Response } from 'express';
import LoginService from '../services/login.service';

export default class LoginController {
  constructor(readonly service = new LoginService()) {}

  public login = async (req: Request, res: Response, next: NextFunction) => {
    const { username, password } = req.body;
    try {
      const token = await this.service.login(username, password);
      res.status(200).json({ token });
    } catch (error) {
      next(error);
    }
  };
}