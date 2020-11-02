import express from 'express';
import { authenticateToken } from '../middlewares';
import { createDelivery, readAllDeliveries, updateDelivery, deleteDelivery } from '../useCases';

const router = express.Router();

router.post('/', authenticateToken, createDelivery);

router.get('/', authenticateToken, readAllDeliveries);

router.put('/:id', authenticateToken, updateDelivery);

router.delete('/:id', authenticateToken, deleteDelivery);

export default router;
