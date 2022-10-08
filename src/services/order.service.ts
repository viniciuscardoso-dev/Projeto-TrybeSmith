import Joi from 'joi';
import OrderModel from '../models/order.model';
import connection from '../models/connection';
import { IOrder, IUser } from '../interfaces';
import ProductModel from '../models/product.model';

export default class OrderService {
  model: OrderModel;

  modelProduct: ProductModel;

  constructor() {
    this.model = new OrderModel(connection);
    this.modelProduct = new ProductModel(connection);
  }

  async getAllOrders() {
    const orders = await this.model.getAllOrders();
    return orders;
  }

  async newOrder(productsIds: number[], user: IUser) {
    this.validateOrder(productsIds);
    const orderId = await this.model.insertOrder(user.id as number);
    const insertedProducts = productsIds.map((id) => (
      this.modelProduct.alterProductOrder(orderId as number, id)
    ));
    await Promise.all(insertedProducts);
    const result: IOrder = {
      userId: user.id,
      productsIds,
    };
    return result;
  }

  private validateOrder = (productsIds: number[]) => {
    const orderField = Joi.object({
      productsIds: Joi.array().min(1).required().items(Joi.number()),
    });
    const { error } = orderField.validate({ productsIds });
    if (error) throw new Error(error.message);
  };
}