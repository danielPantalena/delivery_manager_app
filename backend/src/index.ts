import express from 'express';
import adminRouter from './controllers';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

const PORT = process.env.PORT ?? 3000;

app.use(express.json());

app.use('/admin', adminRouter)

app.get('/', (req, res) => res.send('Hello World'));

app.listen(PORT, () => console.log(`DeliveryManager listening at localhost:${PORT}`));
