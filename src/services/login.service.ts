import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { IUser } from '../interfaces';
import connection from '../models/connection';
import UserModel from '../models/user.model';

dotenv.config();

export default class LoginService {
  constructor(readonly model = new UserModel(connection)) {}

  generateToken = (user: IUser): string => {
    const payload = { id: user.id, username: user.username };
    const token = jwt.sign(payload, 'secret');
    return token;
  };

  public async login(username: string, password: string) {
    const user = await this.model.getByUsernameAndPassword(username, password);
    if (!user) throw new Error('User not found');

    const token = this.generateToken(user);
    return token;
  }
}

// configurar process.env.JWT_SECRET

// generate token como private