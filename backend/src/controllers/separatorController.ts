import express from 'express';
import { authenticateToken } from '../middlewares';
import {
  assignDelivery,
  createDelivery,
  readAllDeliveries,
  readAllToDelivery,
  readAllUndelivered,
} from '../useCases';

const router = express.Router();

router.post('/', authenticateToken, createDelivery);

router.get('/', authenticateToken, readAllDeliveries);

router.get('/actives', authenticateToken, readAllToDelivery);

router.get('/undelivered', authenticateToken, readAllUndelivered);

router.put('/', authenticateToken, assignDelivery);

export default router;
