import { updateById } from '../models/crud';

const createDelivery = (deliveryId: string, deliveryMan: string) =>
  updateById('deliveries', deliveryId, { deliveryMan });

export default createDelivery;
