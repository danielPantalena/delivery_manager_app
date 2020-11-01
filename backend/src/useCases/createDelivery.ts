import { create } from '../models/crud';

const createDelivery = (delivery: object) => create('deliveries', delivery);

export default createDelivery;
