import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import router from './controllers/index';

dotenv.config();

const app = express();

const PORT = process.env.PORT ?? 3000;

app.use(express.json());
app.use(cookieParser());

app.use('/admin', router);
app.use('/separator', router);
app.use('/deliveryman', router);

app.listen(PORT, () => console.log(`DeliveryManager listening at localhost:${PORT}`));
