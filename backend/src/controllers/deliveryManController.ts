import express from 'express';
import { authenticateToken } from '../middlewares';
import { finishDelivery, readAllUndelivered } from '../useCases';

const router = express.Router();

router.get('/', authenticateToken, readAllUndelivered);

router.put('/:id', authenticateToken, finishDelivery);

export default router;
