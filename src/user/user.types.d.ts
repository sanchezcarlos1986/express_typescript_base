export type User = {
  id: number;
  name: string;
  username: string;
  email: string;
  company: Company;
};

export type Address = {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  geo: Geo;
};

export type Geo = {
  lat: string;
  lng: string;
};

export type Company = {
  name: string;
  catchPhrase: string;
  bs: string;
};

export interface Repository {
  getAll: () => User[];
  getOneById: (id: string) => User | undefined;
  create: (data: User) => User;
  update: (id: string) => void;
  delete: (id: string) => void;
}
