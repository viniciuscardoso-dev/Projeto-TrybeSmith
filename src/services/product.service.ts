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
    const product = await this.model.newProduct({ name, amount });
    return product;
  }
}