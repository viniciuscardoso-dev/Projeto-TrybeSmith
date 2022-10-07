import OrderModel from '../models/order.model';
import connection from '../models/connection';

export default class OrderService {
  model: OrderModel;

  constructor() {
    this.model = new OrderModel(connection);
  }

  async getAllOrders() {
    const orders = await this.model.getAllOrders();
    return orders;
  }
}