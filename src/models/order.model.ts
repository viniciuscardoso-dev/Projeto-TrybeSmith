import { Pool, ResultSetHeader } from 'mysql2/promise';

export default class OrderModel {
  public connection: Pool;

  constructor(connection: Pool) {
    this.connection = connection;
  }

  public async getAllOrders() {
    const result = await this.connection.execute(`
    SELECT o.id, o.userId,
    JSON_ARRAYAGG(p.id) AS productsIds
    FROM Trybesmith.Orders AS o
    INNER JOIN Trybesmith.Products AS p
    ON p.orderId = o.id
    GROUP BY p.orderId;
    `);
    const [rows] = result;
    return rows;
  }

  public async insertOrder(id: number) {
    const [{ insertId }] = await this.connection.execute<ResultSetHeader>(`
    INSERT INTO Trybesmith.Orders (userId) VALUES (?);
    `, [id]);
    return insertId;
  }
}