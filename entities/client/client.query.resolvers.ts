import {IdPayload, Context} from '../../types';
import {Client} from './Client.model';

export default {
  Query: {
    getClients: async () => {
      try {
        const clients = await Client.find({});

        return clients;
      } catch (error) {
        throw new Error(`Error getting all clients: ${error}`);
      }
    },
    getClientsBySeller: async (_: any, {}: any, context: Context) => {
      try {
        const clients = await Client.find({seller: context.user._id});

        return clients;
      } catch (error) {
        throw new Error(`Error getting all clients for this seller: ${error}`);
      }
    },
    getClient: async (_: any, {id}: IdPayload, context: Context) => {
      const client = await Client.findById(id);

      if (!client) {
        throw new Error('Client not found');
      }

      if (String(client.seller) !== context.user._id) {
        throw new Error(
          `This user don't have the permissions to see this client`,
        );
      }

      return client;
    },
  },
};
