import { Router } from 'express';
import UserController from '../controllers/user.controller';

const userController = new UserController(); 
const router = Router();

router.post('/', (req, res) => userController.newUser(req, res));

export default router;