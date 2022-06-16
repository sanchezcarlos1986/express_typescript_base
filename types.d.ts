export type UserType = {
  _id: string;
  name: string;
  lastName: string;
  email: string;
  password: string;
  created: Date;
};

export type Context = {
  user: UserType;
};

export type TokenPayload = {
  token: string;
};

export type IdPayload = {
  id: string;
};

export type UserInput = {
  input: {
    name: string;
    lastName: string;
    email: string;
    password: string;
  };
};

export type AuthInput = {
  input: {email: string; password: string};
};

export type ClientInput = {
  input: {
    name: string;
    lastName: string;
    company: string;
    email: string;
    phone: string;
  };
};

export type ProductInput = {
  input: {
    name: string;
    stock: number;
    price: number;
  };
};
