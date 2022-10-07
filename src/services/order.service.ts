import Joi from 'joi';
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

  async newOrder(productsIds: number[]) {
    this.validateOrder(productsIds);
    // const order = this.model.
    // return products;
  }

  private validateOrder = (products: number[]) => {
    const orderField = Joi.array().items(Joi.number());
    const { error } = orderField.validate(products);
    if (error) throw new Error(error.message);
  };
}