import { Pool } from 'mysql2/promise';
import connection from './connection';

export default class BookModel {
  private connection: Pool;

  constructor() {
    this.connection = connection;
  }

  public async getAll() {
    const result = await this.connection.execute('SELECT * FROM Trybesmith.Users');
    const [rows] = result;
    return rows;
  }
}