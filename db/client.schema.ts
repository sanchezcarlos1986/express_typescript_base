import {gql} from 'apollo-server';

export const typeDefs = gql`
  type Client {
    id: ID
    name: String
    lastName: String
    company: String
    email: String
    phone: String
    created: String
    seller: ID
  }
`;
