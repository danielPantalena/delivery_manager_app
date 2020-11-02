import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import {
  adminController,
  separatorController,
  deliveryManController,
  registerUserController,
} from './controllers';

dotenv.config();

const app = express();

const PORT = process.env.PORT ?? 3000;

app.use(express.json());
app.use(cookieParser());

app.use('/register', registerUserController);
app.use('/admin', adminController);
app.use('/separator', separatorController);
app.use('/deliveryman', deliveryManController);

app.listen(PORT, () => console.log(`DeliveryManager listening at localhost:${PORT}`));
