import express, { NextFunction, Request, Response } from 'express';
import loginRouter from './routes/login.router';
import productRouter from './routes/product.router';
import userRouter from './routes/user.router';
import orderRouter from './routes/order.router';
import 'express-async-errors';

const app = express();

app.use(express.json());
app.use('/login', loginRouter);
app.use('/products', productRouter);
app.use('/users', userRouter);
app.use('/orders', orderRouter);
app.use((err: Error, req: Request, res: Response, _next: NextFunction) => 
  res.status(500).json(err.message));

export default app;
