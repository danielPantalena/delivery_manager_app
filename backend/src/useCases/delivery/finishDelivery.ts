import { Request, Response } from 'express';
import { errorResponse } from '../../helpers';
import { updateById } from '../../models/crud';

const finishDelivery = async ({ body: { deliveryId } }: Request, res: Response) => {
  try {
    const result = await updateById('delivery', deliveryId, {
      delivered: true,
      modifiedAt: Date.now(),
    });
    if (result) return res.status(200).json({ ...result, message: 'Entrega Finalizada' });
    return res.sendStatus(204);
  } catch ({ message }) {
    return res.status(500).json(errorResponse(message));
  }
};

export default finishDelivery;
