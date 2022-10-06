import ProductModel from '../models/product.model';
import connection from '../models/connection';

export default class ProductService {
  model: ProductModel;

  constructor() {
    this.model = new ProductModel(connection);
  }

  async getAll() {
    const products = await this.model.getAll();
    return products;
  }
}