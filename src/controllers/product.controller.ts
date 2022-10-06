import { Request, Response } from 'express';
import ProductService from '../services/product.service';

export default class ProductController {
  productService: ProductService;

  constructor() {
    this.productService = new ProductService();
  }

  async getAll(req: Request, res: Response) {
    const products = await this.productService.getAll();
    res.status(200).json(products);
  }

  async newProduct(req: Request, res: Response) {
    const { name, amount } = req.body;
    const product = await this.productService.newProduct({ name, amount });
    res.status(201).json(product);
  }
}