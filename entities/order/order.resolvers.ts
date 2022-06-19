import {Order} from './Order.model';
import {Client} from '../client/Client.model';
import {OrderInput} from './order.types';
import {Context} from '../../types';
import {ClientType} from '../client/client.types';

export default {
  Mutation: {
    newOrder: async (_: any, {input}: OrderInput, context: Context) => {
      const {client} = input;

      const clientAlreadyExists: ClientType | null = await Client.findById(
        client,
      );

      if (!clientAlreadyExists) {
        throw new Error('Client not found');
      }

      if (String(clientAlreadyExists.seller) !== context.user._id) {
        throw new Error(
          `This user don't have enough permissions for this Client`,
        );
      }

      try {
        const newOrder = new Order(input);
        newOrder.seller = context.user._id;
        const result = await newOrder.save();
        return result;
      } catch (error) {
        throw new Error(`Error creating a new order: ${error}`);
      }
    },
  },
};
