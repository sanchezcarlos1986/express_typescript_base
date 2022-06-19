type OrderProductInput = {
  input: {
    id: string;
    quantity: number;
  };
};

type OrderState = 'PENDING' | 'COMPLETED' | 'CANCELLED';

export type OrderInput = {
  input: {
    id: string;
    order: [OrderProductInput];
    total: number;
    client: string;
    seller: string;
    state: OrderState;
    created: string;
  };
};
