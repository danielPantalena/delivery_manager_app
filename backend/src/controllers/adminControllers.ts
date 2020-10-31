import express from 'express';
import * as crud from '../models/crud';
import validateUser from '../middlewares/validateUser';

const adminRouter = express.Router();

const type = 'admin';

adminRouter.post('/', validateUser, ({ body: { user } }, res) =>
  crud.create('admin', { user, type }).then((createdDoc) => res.status(201).json(createdDoc))
);

adminRouter.get('/', (_req, res) =>
  crud.readAll('admin').then((collection) => res.status(200).json(collection))
);

adminRouter.delete('/:id', async ({ params: { id } }, res) => {
});

export default adminRouter;
