import express from 'express';
import bcrypt from 'bcrypt';
import { readAll, readOneById } from '../models/crud';
import { authenticateUser, authenticateToken, validateUser } from '../middlewares';
import { assignDelivery, createDelivery, readAllToDelivery, readAllUndelivered } from '../useCases';
import readAllDeliveries from '../useCases/readAllDeliveries';

const router = express.Router();

router.post('/delivery', createDelivery);

router.get('/delivery', readAllDeliveries);

router.get('/delivery/actives', readAllToDelivery);

router.get('/delivery/undelivered', readAllUndelivered);

router.put('/delivery', assignDelivery);

export default router;
