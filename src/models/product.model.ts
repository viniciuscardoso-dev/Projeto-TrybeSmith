import { Pool, ResultSetHeader, RowDataPacket } from 'mysql2/promise';
import { IProduct } from '../interfaces';

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

  public async getById(id: number) {
    const [[rows]] = await this.connection.execute<RowDataPacket[]>(`
    SELECT name, amount FROM Trybesmith.Products WHERE id = ?`, [id]);
    return rows;
  }

  public async newProduct({ name, amount }: IProduct): Promise<IProduct> {
    const [{ insertId }] = await this.connection.execute<ResultSetHeader>(`
    INSERT INTO Trybesmith.Products (name, amount) VALUES
    (?, ?)`, [name, amount]);
    return { id: insertId, name, amount };
  }

  public async alterProductOrder(id: number, orderId: number) {
    await this.connection.execute(`
    UPDATE Trybesmith.Products
    SET orderId = ?
    WHERE id = ?;
    `, [id, orderId]);
  }
}