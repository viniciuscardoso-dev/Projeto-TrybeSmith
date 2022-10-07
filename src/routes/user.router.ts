import { Router } from 'express';
import UserController from '../controllers/user.controller';

const userController = new UserController(); 
const router = Router();

router.post('/', (req, res, next) => userController.newUser(req, res, next));

export default router;