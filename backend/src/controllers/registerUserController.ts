import express from 'express';
import { validateUser } from '../middlewares';
import { createUser } from '../useCases';

const router = express.Router();

router.post('/', validateUser, createUser);

export default router;
