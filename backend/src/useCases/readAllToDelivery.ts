import { Request, Response } from 'express';
import { errorResponse } from '../helpers';
import { readAll } from '../models/crud';

const readAllDeliveries = (_req: Request, res: Response) =>
  readAll('delivery')
    .then((deliveries) => deliveries.filter(({ delivered }) => !delivered))
    .then((toDelivery) => res.status(200).json(toDelivery))
    .catch(({ message }) => res.status(500).json(errorResponse(message)));

export default readAllDeliveries;
