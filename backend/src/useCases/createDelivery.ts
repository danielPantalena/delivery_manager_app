import { Request, Response } from 'express';
import { errorResponse } from '../helpers';
import { create } from '../models/crud';

const createDelivery = ({ body }: Request, res: Response) => {
  body.createdAt = Date.now();
  body.modifiedAt = body.createdAt;

  return create('delivery', body)
    .then((createdDoc) => res.status(201).json(createdDoc))
    .catch(({ message }) => res.status(500).json(errorResponse(message)));
};

export default createDelivery;
