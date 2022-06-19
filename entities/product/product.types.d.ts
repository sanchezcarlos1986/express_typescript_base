export type ProductType = {
  _id: string;
  name: string;
  stock: number;
  price: number;
  created: string;
  save: () => void;
};

export type ProductInput = {
  input: {
    name: string;
    stock: number;
    price: number;
  };
};
