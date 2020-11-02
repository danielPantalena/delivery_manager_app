import { Request, Response } from 'express';
import { errorResponse } from '../../helpers';
import { updateById } from '../../models/crud';

const updateDelivery = async (
  {
    params: { id },
    body,
    cookies: {
      data: { user, type },
    },
  }: Request,
  res: Response
) => {
  const modifiedAt = Date.now();
  const lastModifiedBy = { user, type };
  try {
    const result = await updateById('delivery', id, { ...body, modifiedAt, lastModifiedBy });
    if (result) return res.status(200).json({ ...result, message: 'Entrega atualizada' });
    return res.sendStatus(204);
  } catch ({ message }) {
    return res.status(500).json(errorResponse(message));
  }
};

export default updateDelivery;
