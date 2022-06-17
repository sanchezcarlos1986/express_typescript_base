import path from 'path';
import jwt from 'jsonwebtoken';
import {config} from 'dotenv';
import {ApolloServer} from 'apollo-server';
import {mergeResolvers} from '@graphql-tools/merge';
import {loadFilesSync} from '@graphql-tools/load-files';
import {typeDefs} from './graphql/schemas/schema';
import {startConnection} from './config/db';

config({
  path: 'variables.env',
});

startConnection();

// Resolvers
const resolverFiles = loadFilesSync(path.join(__dirname, 'graphql/resolvers/'));
const resolvers = mergeResolvers(resolverFiles);

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
