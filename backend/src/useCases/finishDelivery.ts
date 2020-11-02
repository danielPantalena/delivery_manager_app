import { updateById } from '../models/crud';

const finishDelivery = (deliveryId: string) =>
  updateById('deliveries', deliveryId, { delivered: true, modifiedAt: Date.now() });

export default finishDelivery;
