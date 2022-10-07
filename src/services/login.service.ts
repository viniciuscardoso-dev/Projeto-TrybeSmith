import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import Joi from 'joi';
import { GenericError, IUser } from '../interfaces';
import connection from '../models/connection';
import UserModel from '../models/user.model';

dotenv.config();

export default class LoginService {
  constructor(readonly model = new UserModel(connection)) {}

  generateToken = (user: IUser): string => {
    const payload = { id: user.id, username: user.username };
    const secret = process.env.JWT_SECRET as string;
    const token = jwt.sign(payload, secret);
    return token;
  };

  public async login(username: string, password: string) {
    this.validateLogin({ username, password });
    const user = await this.model.getByUsernameAndPassword(username, password);
    if (!user) throw new GenericError('Username or password invalid', 401);
    const token = this.generateToken(user);
    return token;
  }

  private validateLogin = (user: IUser) => {
    const userlogin = Joi.object({
      username: Joi.string().required(),
      password: Joi.string().required(),
    });
    const { error } = userlogin.validate(user);
    if (error) throw new GenericError(error.message, 400);
  };
}

// configurar process.env.JWT_SECRET
