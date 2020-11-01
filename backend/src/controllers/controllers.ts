import express from 'express';
import bcrypt from 'bcrypt';
import * as crud from '../models/crud';
import validateUser from '../middlewares/validateUser';
import { errorResponse } from '../helpers';

const adminRouter = express.Router();

adminRouter.post('/', validateUser, async ({ body: { user, password }, baseUrl }, res) => {
  try {
    const hashedPassword: string = await bcrypt.hash(password, 10);
    return crud
      .create(baseUrl.substring(1), { user, hashedPassword })
      .then((createdDoc) => res.status(201).json(createdDoc));
  } catch ({ message }) {
    return res.status(500).json(errorResponse(message));
  }
});

adminRouter.get('/', ({ baseUrl }, res) =>
  crud
    .readAll(baseUrl.substring(1))
    .then((collection) => res.status(200).json(collection))
    .catch(({ message }) => res.status(500).json(errorResponse(message)))
);

adminRouter.get('/:id', async ({ params: { id }, baseUrl }, res) => {
  try {
    const result = await crud.readOneById(baseUrl.substring(1), id);
    if (result) return res.status(200).json(result);
    return res.status(404).json(errorResponse('No user found'));
  } catch ({ message }) {
    return res.status(500).json(errorResponse(message));
  }
});

adminRouter.delete('/:id', async ({ params: { id }, baseUrl }, res) => {
  try {
    const result = await crud.deleteById(baseUrl.substring(1), id);
    if (result?.value) return res.status(200).json(result.value);
    return res.status(404).json(errorResponse('No user found'));
  } catch ({ message }) {
    return res.status(500).json(errorResponse(message));
  }
});

export default adminRouter;
