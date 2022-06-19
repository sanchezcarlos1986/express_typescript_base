export type ClientInput = {
  input: {
    name: string;
    lastName: string;
    company: string;
    email: string;
    phone: string;
  };
};

export type ClientType = {
  _id: string;
  name: string;
  lastName: string;
  company: string;
  email: string;
  phone: string;
  created: string;
  seller: string;
};
