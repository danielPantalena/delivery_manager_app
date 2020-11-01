import express from 'express';
import bcrypt from 'bcrypt';
import * as crud from '../models/crud';
import { authenticateUser, authenticateToken, validateUser } from '../middlewares';
import { errorResponse, generateToken } from '../helpers';
import createDelivery from '../useCases/createDelivery';

const router = express.Router();

router.post('/delivery', ({ body: { delivery } }, res) => createDelivery(delivery))
