import express from 'express';
import * as crud from '../models/crud';
import validateUser from '../middlewares/validateUser';

const adminRouter = express.Router();

const errorResponse = (message: string) => ({ error: true, message });

adminRouter.post('/', validateUser, ({ body: { user } }, res) =>
  crud.create('admin', { user }).then((createdDoc) => res.status(201).json(createdDoc))
);

adminRouter.get('/', (_req, res) =>
  crud.readAll('admin').then((collection) => res.status(200).json(collection))
);

adminRouter.get('/:id', async ({ params: { id } }, res) => {
  const result = await crud.readOneById('admin', id);
  if (result) return res.status(200).json(result);
  return res.status(404).json(errorResponse('No user found'));
});

adminRouter.delete('/:id', async ({ params: { id } }, res) => {
  const result = await crud.deleteById('admin', id);

  if (result?.value) return res.status(200).json(result.value);

  return res.status(404).json(errorResponse('No user found'));
});

export default adminRouter;
