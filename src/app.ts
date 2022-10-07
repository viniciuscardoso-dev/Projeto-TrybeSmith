import express from 'express';
import loginRouter from './routes/login.router';
import productRouter from './routes/product.router';
import userRouter from './routes/user.router';
import orderRouter from './routes/order.router';
import 'express-async-errors';
import error from './middlewares/error';

const app = express();

app.use(express.json());
app.use('/login', loginRouter);
app.use('/products', productRouter);
app.use('/users', userRouter);
app.use('/orders', orderRouter);

app.use(error);
export default app;
