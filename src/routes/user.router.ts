import { Router } from 'express';
import UserController from '../controllers/product.controller';

const userController = new UserController(); 
const router = Router();

router.post('/', (req, res) => userController.newProduct(req, res));

export default router;