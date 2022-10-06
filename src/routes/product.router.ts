import { Router } from 'express';
import productController from "../controllers/product.controller";

const router = Router();

router.get('/', productController.findAll);

export default router;