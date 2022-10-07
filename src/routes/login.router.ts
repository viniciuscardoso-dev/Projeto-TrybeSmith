import { Router } from 'express';
import LoginController from '../controllers/login.controller';

const loginController = new LoginController();
const router = Router();

router.post('/', (req, res) => loginController.login(req, res));

export default router;