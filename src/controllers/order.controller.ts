import { NextFunction, Request, Response } from 'express';
import OrderService from '../services/order.service';

export default class OrderController {
  orderService: OrderService;

  constructor() {
    this.orderService = new OrderService();
  }

  async getAllOrders(req: Request, res: Response) {
    const orders = await this.orderService.getAllOrders();
    res.status(200).json(orders);
  }

  async newOrder(req: Request, res: Response, next: NextFunction) {
    const { productsIds } = req.body;
    try {
      const newOrder = await this.orderService.newOrder(productsIds);
      res.status(201).json({ newOrder });
    } catch (error) {
      next(error);
    }
  }
}