import {gql} from 'apollo-server';

export const typeDefs = gql`
  type User {
    id: ID
    name: String
    lastName: String
    email: String
    created: String
  }

  type Product {
    id: ID
    name: String
    stock: Int
    price: Float
    created: String
  }

  type Token {
    token: String
  }

  # User
  input UserInput {
    name: String!
    lastName: String!
    email: String!
    password: String!
  }

  #Product
  input ProductInput {
    name: String!
    stock: Int!
    price: Float!
  }

  input AuthInput {
    email: String!
    password: String!
  }

  type Query {
    getUser(token: String!): User
  }

  type Query {
    getProducts: [Product]
    getProduct(id: ID!): Product
  }

  type Mutation {
    # User
    newUser(input: UserInput): User
    authUser(input: AuthInput): Token

    # Product
    newProduct(input: ProductInput): Product
    updateProduct(id: ID!, input: ProductInput): Product
  }
`;
