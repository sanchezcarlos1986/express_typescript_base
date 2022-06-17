import {IdPayload, ClientInput, Context} from '../../types';
import {Client} from '../../models/Client';

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
        throw new Error(`Error getting all clients: ${error}`);
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
  Mutation: {
    newClient: async (_: any, {input}: ClientInput, context: Context) => {
      const {email} = input;

      const clientAlreadyExists = await Client.findOne({email});

      if (clientAlreadyExists) {
        throw new Error('This client is already registered');
      }

      try {
        const newClient = new Client(input);
        newClient.seller = context.user._id;
        const result = await newClient.save();
        return result;
      } catch (error) {
        throw new Error(`Error creating a new user: ${error}`);
      }
    },
    updateClient: async (
      _: any,
      {id, input}: {id: string; input: ClientInput},
      context: Context,
    ) => {
      try {
        let client = await Client.findById(id);

        if (!client) {
          throw new Error('Client not found');
        }

        if (String(client.seller) !== context.user._id) {
          throw new Error(
            `This user don't have the permissions to update this client`,
          );
        }

        client = await Client.findOneAndUpdate({_id: id}, input, {new: true});

        return client;
      } catch (error) {
        throw new Error(`Error updating client: ${error}`);
      }
    },
    deleteClient: async (_: any, {id}: {id: string}, context: Context) => {
      try {
        const client = await Client.findById(id);

        if (!client) {
          throw new Error('Client not found');
        }

        if (String(client.seller) !== context.user._id) {
          throw new Error(
            `This user don't have the permissions to delete this client`,
          );
        }

        await Client.findOneAndDelete({_id: id});

        return 'Client deleted';
      } catch (error) {
        throw new Error(`Error updating client: ${error}`);
      }
    },
  },
};
