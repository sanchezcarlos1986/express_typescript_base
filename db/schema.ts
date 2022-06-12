import {gql} from 'apollo-server';

export const typeDefs = gql`
  type User {
    id: ID
    name: String
    lastName: String
    email: String
    created: String
  }

  input UserInput {
    name: String!
    lastName: String!
    password: String!
    email: String!
  }

  type Query {
    getCourses: String
  }

  type Mutation {
    newUser(input: UserInput): User
  }
`;
