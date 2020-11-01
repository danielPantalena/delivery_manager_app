import express from 'express';
import bcrypt from 'bcrypt';
import * as crud from '../models/crud';
import { authenticateUser, authenticateToken, validateUser } from '../middlewares';
import { errorResponse, generateToken } from '../helpers';

const router = express.Router();

router.post('/', validateUser, async ({ body: { user, password }, baseUrl }, res) => {
  try {
    const hashedPassword: string = await bcrypt.hash(password, 10);
    return crud.create(baseUrl.substring(1), { user, hashedPassword }).then((createdDoc) => {
      const { hashedPassword, ...data } = createdDoc;
      const token = generateToken(createdDoc._id);
      res.status(201).json({ data, token });
    });
  } catch ({ message }) {
    return res.status(500).json(errorResponse(message));
  }
});

router.post(
  '/login',
  authenticateUser,
  authenticateToken,
  async ({ body: { user, token }, baseUrl }, res) => {
    res
      .cookie('online', true)
      .status(200)
      .json({ user, type: baseUrl.substring(1), token });
  }
);

router.post('/logout', async ({ baseUrl }, res) =>
  res.cookie('online', false).clearCookie('token').status(204).redirect(baseUrl)
);

router.get('/', ({ baseUrl }, res) =>
  crud
    .readAll(baseUrl.substring(1))
    .then((collection) => res.status(200).json(collection))
    .catch(({ message }) => res.status(500).json(errorResponse(message)))
);

router.get('/:id', async ({ params: { id }, baseUrl }, res) => {
  try {
    const result = await crud.readOneById(baseUrl.substring(1), id);
    if (result) return res.status(200).json(result);
    return res.status(404).json(errorResponse('No user found'));
  } catch ({ message }) {
    return res.status(500).json(errorResponse(message));
  }
});

router.delete('/:id', async ({ params: { id }, baseUrl }, res) => {
  try {
    const result = await crud.deleteById(baseUrl.substring(1), id);
    if (result?.value) return res.status(200).json(result.value);
    return res.status(404).json(errorResponse('No user found'));
  } catch ({ message }) {
    return res.status(500).json(errorResponse(message));
  }
});

export default router;
