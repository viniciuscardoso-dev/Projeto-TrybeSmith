import UserModel from '../models/user.model';
import connection from '../models/connection';
import { IUser } from '../interfaces';

export default class UserService {
  model: UserModel;

  constructor() {
    this.model = new UserModel(connection);
  }

  async newUser({ username, classe, level, password }: IUser) {
    const user = await this.model.newUser({ username, classe, level, password });
    return user;
  }
}