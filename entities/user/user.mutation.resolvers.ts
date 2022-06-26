import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import {config} from 'dotenv';
import {User} from './User.model';
import {AuthInput, UserInput, UserType} from './user.types';

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

export default {
  Mutation: {
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
  },
};
