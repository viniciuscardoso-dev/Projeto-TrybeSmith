import { Request, Response } from 'express';
import LoginService from '../services/login.service';

export default class LoginController {
  constructor(readonly service = new LoginService()) {}

  login = async (req: Request, res: Response) => {
    const { username, password } = req.body;
    const token = await this.service.login(username, password);
    res.status(200).json({ token });
  };
}