import { Request, Response } from 'express';
import { errorResponse } from '../../helpers';
import { readAll } from '../../models/crud';

const readAllUndelivered = ({ body: { deliveryMan } }: Request, res: Response) =>
  readAll('delivery')
    .then((deliveries) =>
      deliveries.filter(
        (delivery) => (delivery.deliveryMan === deliveryMan || !deliveryMan) && !delivery.delivered
      )
    )
    .then((unDelivered) => res.status(200).json(unDelivered))
    .catch(({ message }) => res.status(500).json(errorResponse(message)));

export default readAllUndelivered;
