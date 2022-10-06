import { Pool } from 'mysql2/promise';

export default class ProductModel {
  public connection: Pool;

  constructor(connection: Pool) {
    this.connection = connection;
  }

  public async getAll() {
    const result = await this.connection.execute('SELECT * FROM Trybesmith.Products');
    const [rows] = result;
    return rows;
  }
}