import jwt from 'jsonwebtoken';
import {config} from 'dotenv';
import {ApolloServer} from 'apollo-server';
import {resolvers} from './db/resolvers';
import {typeDefs} from './db/schema';
import {startConnection} from './config/db';

config({
  path: 'variables.env',
});

startConnection();

// server
const server = new ApolloServer({
  typeDefs: typeDefs,
  resolvers: resolvers,
  context: ({req}) => {
    const token = req.headers['authorization'] || '';

    if (token) {
      try {
        const user = jwt.verify(token, process.env.SECRET as string);

        return {
          user,
        };
      } catch (error) {
        throw new Error(`Error verifying user in context: ${error}`);
      }
    }
  },
});

// run server
server
  .listen()
  .then(({url}) => console.log(`🔥 GraphQL server running on: ${url} 🔥`));
