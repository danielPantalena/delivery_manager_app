import express from 'express';
import { create } from './models/crud';

const app = express();

const PORT = process.env.PORT ?? 3000;

app.use(express.json());

app.get('/', (req, res) => res.send('Hello World'));

app.listen(PORT, () => console.log(`DeliveryManager listening at localhost:${PORT}`));
