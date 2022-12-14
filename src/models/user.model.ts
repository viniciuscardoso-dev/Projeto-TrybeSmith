import { Pool, ResultSetHeader, RowDataPacket } from 'mysql2/promise';
import { IUser } from '../interfaces';

export default class UserModel {
  public connection: Pool;

  constructor(connection: Pool) {
    this.connection = connection;
  }

  public async newUser({ username, classe, level, password }: IUser): Promise<IUser> {
    const [{ insertId }] = await this.connection.execute<ResultSetHeader>(`
    INSERT INTO Trybesmith.Users (username, classe, level, password) VALUES
    (?, ?, ?, ?)`, [username, classe, level, password]);
    return { id: insertId, username, classe, level, password };
  }

  public async getByUsernameAndPassword(username: string, password: string): Promise<IUser> {
    const [[user]] = await this.connection.execute<(
    IUser & RowDataPacket)[]>(
      `SELECT * FROM Trybesmith.Users
      WHERE username = ? AND password = ?`,
      [username, password],
      );
    return user as IUser;
  }
}