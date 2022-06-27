type OrderProductInput = {
  id: string;
  quantity: number;
};

export enum OrderStatusEnum {
  'PENDING',
  'COMPLETED',
  'CANCELLED',
}

type OrderState =
  | OrderStatusEnum.PENDING
  | OrderStatusEnum.COMPLETED
  | OrderStatusEnum.CANCELLED;

export type OrderInput = {
  id: string;
  order: [OrderProductInput];
  total: number;
  client: string;
  seller: string;
  state: OrderState;
  created: string;
};

type OrderGroup = {
  id: string;
  quantity: number;
};

export type OrderType = {
  _id: string;
  order: [OrderGroup];
  total: number;
  client: string;
  seller: string;
  state: OrderState;
  created: string;
};
