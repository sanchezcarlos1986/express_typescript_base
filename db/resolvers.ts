import {User} from '../models/Usuario';
import brcyptjs from 'bcryptjs';

export const resolvers = {
  Query: {
    getCourses: (_: any) => 'get courses',
  },
  Mutation: {
    newUser: async (_: any, {input}: any) => {
      const {email, password} = input;
      const userAlreadyExists = await User.findOne({email});

      if (userAlreadyExists) {
        throw new Error('This user is already registered');
      }

      // salt password
      const salt = await brcyptjs.genSalt(10);
      input.password = await brcyptjs.hash(password, salt);

      try {
        const user = new User(input);
        user.save();
        return user;
      } catch (err) {
        console.error(`Error creating a new user: ${err}`);
      }
    },
  },
};
