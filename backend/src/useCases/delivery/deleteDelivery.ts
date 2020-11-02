import { Request, Response } from 'express';
import { errorResponse } from '../../helpers';
import { deleteById } from '../../models/crud';

const deleteDelivery = async ({ params: { id } }: Request, res: Response) => {
  try {
    const result = await deleteById('delivery', id);
    if (result)
      return res.status(200).json({ deletedDelivery: { ...result }, message: 'Entrega deletada' });
    return res.sendStatus(204);
  } catch ({ message }) {
    return res.status(500).json(errorResponse(message));
  }
};

export default deleteDelivery;
