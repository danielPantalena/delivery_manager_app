import { Request, Response } from 'express';
import { errorResponse } from '../../helpers';
import { updateById } from '../../models/crud';

const assignDelivery = async ({ body: { deliveryId, deliveryMan } }: Request, res: Response) => {
  const modifiedAt = Date.now();
  try {
    const result = await updateById('delivery', deliveryId, { deliveryMan, modifiedAt });
    if (result) return res.status(200).json({ ...result, message: 'Entrega atribuida' });
    return res.sendStatus(204);
  } catch ({ message }) {
    return res.status(500).json(errorResponse(message));
  }
};

export default assignDelivery;
