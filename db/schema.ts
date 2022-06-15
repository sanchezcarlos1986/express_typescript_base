import {gql} from 'apollo-server';

export const typeDefs = gql`
  type User {
    id: ID
    name: String
    lastName: String
    email: String
    created: String
  }

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

  # Client
  input ClientInput {
    name: String!
    lastName: String!
    company: String!
    email: String!
    phone: String
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

  type Query {
    getClients: [Client]
    getClientsBySeller: [Client]
    getClient(id: ID!): Client
  }

  type Mutation {
    # User
    newUser(input: UserInput): User
    authUser(input: AuthInput): Token

    # Product
    newProduct(input: ProductInput): Product
    updateProduct(id: ID!, input: ProductInput): Product
    deleteProduct(id: ID!): String

    # Client
    newClient(input: ClientInput): Client
  }
`;
