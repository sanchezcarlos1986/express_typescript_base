import path from 'path';
import {GraphQLFileLoader} from '@graphql-tools/graphql-file-loader';
import {loadSchemaSync} from '@graphql-tools/load';

const typeDefs = loadSchemaSync(
  path.join(__dirname, '../entities/**/*.graphql'),
  {
    loaders: [new GraphQLFileLoader()],
  },
);

export default typeDefs;
