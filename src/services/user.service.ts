import Joi from 'joi';
import UserModel from '../models/user.model';
import connection from '../models/connection';
import { IUser } from '../interfaces';

export default class UserService {
  model: UserModel;

  constructor() {
    this.model = new UserModel(connection);
  }

  async newUser({ username, classe, level, password }: IUser) {
    this.validateUser({ username, classe, level, password });
    const user = await this.model.newUser({ username, classe, level, password });
    return user;
  }

  private validateUser = (user: IUser) => {
    const userField = Joi.object({
      username: Joi.string().required().min(3),
      password: Joi.string().required().min(8),
      level: Joi.number().required().min(1),
      classe: Joi.string().required().min(3),
    });
    const { error } = userField.validate(user);
    if (error) throw new Error(error.message);
  };
}