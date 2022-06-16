import {User} from '../models/User';
import {Product} from '../models/Product';
import {Client} from '../models/Client';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import {config} from 'dotenv';
import {
  UserType,
  TokenPayload,
  IdPayload,
  AuthInput,
  ClientInput,
  Context,
  ProductInput,
  UserInput,
} from '../types';

config({
  path: 'variables.env',
});

// infoToSave, key, expiresIn
const createToken = (
  user: UserType,
  secret: string | any,
  expiresIn: string,
) => {
  const {_id, email, name, lastName} = user;

  return jwt.sign({_id, email, name, lastName}, secret, {expiresIn});
};

export const resolvers = {
  Query: {
    getUser: async (_: any, {token}: TokenPayload) => {
      try {
        const user = await jwt.verify(token, process.env.SECRET as string);

        return user;
      } catch (error) {
        throw new Error(`Error getting user: ${error}`);
      }
    },
    getProducts: async () => {
      try {
        const products = await Product.find({});

        return products;
      } catch (error) {
        throw new Error(`Error getting all products: ${error}`);
      }
    },
    getProduct: async (_: any, {id}: IdPayload) => {
      const product = await Product.findById(id);

      if (!product) {
        throw new Error('Product not found');
      }

      return product;
    },
    // Client
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
    // User
    newUser: async (_: any, {input}: UserInput) => {
      const {email, password} = input;
      const userAlreadyExists = await User.findOne({email});

      if (userAlreadyExists) {
        throw new Error('This user is already registered');
      }

      // salt password
      const salt = await bcryptjs.genSalt(10);
      input.password = await bcryptjs.hash(password, salt);

      try {
        const user = new User(input);
        user.save();
        return user;
      } catch (error) {
        throw new Error(`Error creating a new user: ${error}`);
      }
    },
    authUser: async (_: any, {input}: AuthInput) => {
      const {email, password} = input;
      const userAlreadyExists = await User.findOne({email});

      // if user exists
      if (!userAlreadyExists) {
        throw new Error('This user is not registered');
      }

      // check if password is correct
      const isPasswordCorrect = await bcryptjs.compare(
        password,
        userAlreadyExists.password,
      );

      if (!isPasswordCorrect) {
        throw new Error('Password incorrect');
      }

      return {
        token: createToken(userAlreadyExists, process.env.SECRET, '24h'),
      };
    },
    // Product
    newProduct: async (_: any, {input}: ProductInput) => {
      try {
        const user = new Product(input);
        user.save();
        return user;
      } catch (error) {
        throw new Error(`Error creating a new product: ${error}`);
      }
    },
    updateProduct: async (
      _: any,
      {id, input}: {id: string; input: ProductInput},
    ) => {
      try {
        let product = await Product.findById(id);

        if (!product) {
          throw new Error('Product not found');
        }

        product = await Product.findOneAndUpdate({_id: id}, input, {new: true});

        return product;
      } catch (error) {
        throw new Error(`Error updating product: ${error}`);
      }
    },
    deleteProduct: async (_: any, {id}: {id: string}) => {
      try {
        const product = await Product.findById(id);

        if (!product) {
          throw new Error('Product not found');
        }

        await Product.findOneAndDelete({_id: id});

        return 'Product deleted';
      } catch (error) {
        throw new Error(`Error updating product: ${error}`);
      }
    },
    // Client
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
