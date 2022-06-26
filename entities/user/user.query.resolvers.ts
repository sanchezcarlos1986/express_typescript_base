import jwt from 'jsonwebtoken';
import {config} from 'dotenv';
import {TokenPayload} from './user.types';

config({
  path: 'variables.env',
});

export default {
  Query: {
    getUser: async (_: any, {token}: TokenPayload) => {
      try {
        const user = await jwt.verify(token, process.env.SECRET as string);

        return user;
      } catch (error) {
        throw new Error(`Error getting user: ${error}`);
      }
    },
  },
};
