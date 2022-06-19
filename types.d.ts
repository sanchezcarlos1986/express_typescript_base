import {UserType} from './entities/user/user.types';

export type IdPayload = {
  id: string;
};

export type Context = {
  user: UserType;
};
