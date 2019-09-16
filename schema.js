const { ApolloServer, gql } = require('apollo-server-express');
const resolvers = require('./resolvers');

const Query = gql`
  type User {
    id: Int!
    username: String!
    password: String!
    name: String!
    address: String
    email: String!
  }
  type Query {
    profile: User
  }
`;

const Mutation = `
  type Mutation {
    signup (username: String!, password: String!, email: String!, name: String!, address: String): String
    login (username: String!, password: String!): String
  }
`;

const typeDefs = [Query, Mutation];

const schema = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => {
    return {
      user: req.user,
    };
  },
  playground: {
    endpoint: '/graphql',
    settings: {
      'editor.theme': 'light',
    },
  },
});

module.exports = schema;
