export type UserType = {
  _id: string;
  name: string;
  lastName: string;
  email: string;
  password: string;
  created: Date;
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

export type TokenPayload = {
  token: string;
};
