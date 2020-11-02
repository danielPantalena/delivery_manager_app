import express from 'express';
import bcrypt from 'bcrypt';
import * as crud from '../models/crud';
import { authenticateUser, authenticateToken, validateUser } from '../middlewares';
import { assignDelivery, createDelivery } from '../useCases';

const router = express.Router();

router.post('/delivery', createDelivery);

router.get('/delivery', (_req, res) => crud.readAll('delivery'));

router.get('/delivery', (_req, res) => crud.readAll('delivery'));

router.put('/delivery', assignDelivery);
