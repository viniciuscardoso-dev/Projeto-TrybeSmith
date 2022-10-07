import { Router } from 'express';
import ProductController from '../controllers/product.controller';
// import authMiddleware from '../middlewares/authMiddleware';

const productController = new ProductController(); 
const router = Router();

router.get('/', (req, res) => productController.getAll(req, res));
// router.use(authMiddleware);
router.post('/', (req, res) => productController.newProduct(req, res));

export default router;