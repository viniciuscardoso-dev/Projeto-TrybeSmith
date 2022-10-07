import { NextFunction, Request, Response } from 'express';
import LoginService from '../services/login.service';
import UserService from '../services/user.service';

export default class UserController {
  userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  async newUser(req: Request, res: Response, next: NextFunction) {
    const { username, classe, level, password } = req.body;
    try {
      const user = await this.userService.newUser({ username, classe, level, password });
      const login = new LoginService();
      const token = login.generateToken(user);
      
      res.status(201).json({ token });
    } catch (error) {
      next(error);
    }
  }
}
