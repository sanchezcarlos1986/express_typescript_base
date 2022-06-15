import {User} from '../models/User';
import {Product} from '../models/Product';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import {config} from 'dotenv';

config({
  path: 'variables.env',
});

type User = {
  _id: string;
  name: string;
  lastName: string;
  email: string;
  password: string;
  created: Date;
};

// type UserInput = {
//   email: string;
//   password: string;
// };

// infoToSave, key, expiresIn
const createToken = (user: User, secret: string | any, expiresIn: string) => {
  const {_id, email, name, lastName} = user;

  return jwt.sign({_id, email, name, lastName}, secret, {expiresIn});
};

export const resolvers = {
  Query: {
    getUser: async (_: any, {token}: any) => {
      try {
        const userId = await jwt.verify(token, process.env.SECRET as string);

        return userId;
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
    getProduct: async (_: any, {id}: {id: string}) => {
      const product = await Product.findById(id);

      if (!product) {
        throw new Error('Product not found');
      }

      return product;
    },
  },
  Mutation: {
    // User
    newUser: async (_: any, {input}: any) => {
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
    authUser: async (_: any, {input}: any) => {
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
    newProduct: async (_: any, {input}: any) => {
      try {
        const user = new Product(input);
        user.save();
        return user;
      } catch (error) {
        throw new Error(`Error creating a new product: ${error}`);
      }
    },
  },
};
