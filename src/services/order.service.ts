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
    const order = await this.model.insertOrder();
    return order;
  }

  private validateOrder = (productsIds: number[]) => {
    const orderField = Joi.object({
      productsIds: Joi.array().required().items(Joi.number()),
    });     
    const { error } = orderField.validate({ productsIds });
    if (error) throw new Error(error.message);
  };
}