import { Router } from 'express';
import ProductController from '../controllers/product.controller';

const productController = new ProductController(); 
const router = Router();

router.get('/', (req, res) => productController.getAll(req, res));

export default router;