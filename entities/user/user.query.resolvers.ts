import jwt from 'jsonwebtoken';
import {config} from 'dotenv';
import {TokenPayload} from './user.types';
import {Order} from '../order/Order.model';

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
    getBestUsers: async (_: any, {}: any) => {
      const sellers = await Order.aggregate([
        {$match: {state: 'COMPLETED'}},
        {
          $group: {
            _id: '$seller',
            total: {$sum: '$total'},
          },
        },
        {
          $lookup: {
            from: 'users',
            localField: '_id',
            foreignField: '_id',
            as: 'user',
          },
        },
        {
          $limit: 3,
        },
        {
          $sort: {total: -1},
        },
      ]);

      return sellers;
    },
  },
};
