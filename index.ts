import {startConnection} from './config/db';

startConnection();

import {ApolloServer} from 'apollo-server';
import {resolvers} from './db/resolvers';
import {typeDefs} from './db/schema';

// server
const server = new ApolloServer({
  typeDefs: typeDefs,
  resolvers: resolvers,
  context: () => {
    const myContext = 'Hola';

    return {
      myContext,
    };
  },
});

// run server
server
  .listen()
  .then(({url}) => console.log(`🔥 GraphQL server running on: ${url} 🔥`));
