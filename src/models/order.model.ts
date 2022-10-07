import { Pool } from 'mysql2/promise';

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

  public async insertOrder() {
    const result = await this.connection.execute(`
    SELECT * FROM Trybesmith.Orders;
    `);
    const [rows] = result;
    return rows;
  }
}