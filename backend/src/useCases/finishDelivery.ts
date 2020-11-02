import { updateById } from '../models/crud';

const finishDelivery = (deliveryId: string) =>
  updateById('deliveries', deliveryId, { delivered: true });

export default finishDelivery;
