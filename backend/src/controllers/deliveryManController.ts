import express from 'express';
import bcrypt from 'bcrypt';
import { readAll, readOneById } from '../models/crud';
import { authenticateUser, authenticateToken, validateUser } from '../middlewares';
import { assignDelivery, createDelivery, finishDelivery, readAllToDelivery, readAllUndelivered } from '../useCases';
import readAllDeliveries from '../useCases/readAllDeliveries';

const router = express.Router();

router.get('/delivery', readAllUndelivered);

router.put('/delivery', finishDelivery);

export default router;
