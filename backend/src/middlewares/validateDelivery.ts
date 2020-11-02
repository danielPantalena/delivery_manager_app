import { Request, Response, NextFunction } from 'express';
import { readOneByUser } from '../models/crud';
import { errorResponse } from '../helpers';

const validateDelivery = async (
  {
    body: {
      createdBy: { userType, userId },
      order,
      deliveryAddress,
    },
    baseUrl,
  }: Request,
  res: Response,
  next: NextFunction
) => {
  if (userType !) return res.status(400).json(errorResponse('O body deve conter "userType"'))

  return next();
};

export default validateDelivery;
