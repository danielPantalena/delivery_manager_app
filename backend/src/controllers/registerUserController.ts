import express from 'express';
import bcrypt from 'bcrypt';
import * as crud from '../models/crud';
import { authenticateUser, authenticateToken, validateUser } from '../middlewares';
import { errorResponse, generateToken } from '../helpers';

const router = express.Router();

router.post('/', validateUser, async ({ body: { user, password, type } }, res) => {
  try {
    const hashedPassword: string = await bcrypt.hash(password, 10);
    return crud.create(type, { user, hashedPassword }).then((createdDoc) => {
      const { hashedPassword, ...data } = createdDoc;
      const token = generateToken(createdDoc._id);
      res.status(201).json({ data, token });
    });
  } catch ({ message }) {
    return res.status(500).json(errorResponse(message));
  }
});

export default router;
