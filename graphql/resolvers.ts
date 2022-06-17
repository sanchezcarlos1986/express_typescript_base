import path from 'path';
import {mergeResolvers} from '@graphql-tools/merge';
import {loadFilesSync} from '@graphql-tools/load-files';

const resolverFiles = loadFilesSync(
  path.join(__dirname, '../entities/**/*.resolvers.ts'),
);

const resolvers = mergeResolvers(resolverFiles);

export default resolvers;
