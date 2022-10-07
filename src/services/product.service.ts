import Joi from 'joi';
import ProductModel from '../models/product.model';
import connection from '../models/connection';
import { IProduct } from '../interfaces';

export default class ProductService {
  model: ProductModel;

  constructor() {
    this.model = new ProductModel(connection);
  }

  async getAll() {
    const products = await this.model.getAll();
    return products;
  }

  async newProduct({ name, amount }: IProduct) {
    this.validateProduct({ name, amount });
    const product = await this.model.newProduct({ name, amount });
    return product;
  }

  private validateProduct = (product: IProduct) => {
    const productField = Joi.object({
      name: Joi.string().required().min(3),
      amount: Joi.string().required().min(3),
    });
    const { error } = productField.validate(product);
    if (error) throw new Error(error.message);
  };
}