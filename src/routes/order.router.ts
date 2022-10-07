import { Router } from 'express';
import OrderController from '../controllers/order.controller';
import authMiddleware from '../middlewares/authMiddleware';

const orderController = new OrderController();
const router = Router();

router.get('/', (req, res) => orderController.getAllOrders(req, res));
router.use(authMiddleware);
router.post('/', (req, res, next) => orderController.newOrder(req, res, next));

export default router;