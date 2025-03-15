import { instance } from './../base/instance';
import { Product } from '../../../entities/Product.ts';

type Order = {
  id: string;
  products: OrderProduct[];
  status: OrderStatus;
  createdAt: Date;
  updatedAt: Date;
  commandId: string;
};

type OrderProduct = {
  _id: string;
  product: Product;
  quantity: number;
};

enum OrderStatus {
  PendingConfirmation = 'pending_confirmation',
  Processing = 'processing',
  Packaging = 'packaging',
  WaitingForDelivery = 'waiting_for_delivery',
  InTransit = 'in_transit',
  Delivered = 'delivered',
  ReturnRequested = 'return_requested',
  OrderCancelled = 'order_cancelled',
}

type Params = {
  products: Array<{
    id: string;
    quantity: number;
  }>;
  status?: OrderStatus;
};

const create = async function (data: Params): Promise<Order> {
  const response = await instance.post<Order>(`/orders`, data);
  return response.data;
};

export const OrdersApi = {
  create,
};
