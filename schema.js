const graphql = require("graphql");
const types = require("./types");

exports.cinema21 = new graphql.GraphQLSchema({
  query: types.queryType,
  mutation: types.mutationType
});
