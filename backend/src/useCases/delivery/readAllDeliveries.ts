import { Request, Response } from 'express';
import { errorResponse } from '../../helpers';
import { readAll } from '../../models/crud';

const readAllDeliveries = (_req: Request, res: Response) =>
  readAll('delivery')
    .then((deliveries) => res.status(200).json(deliveries))
    .catch(({ message }) => res.status(500).json(errorResponse(message)));

export default readAllDeliveries;
