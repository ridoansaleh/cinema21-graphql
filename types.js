const graphql = require("graphql");
const db = require("./connection");

const UserType = new graphql.GraphQLObjectType({
  name: "User",
  fields: {
    id: {
      type: graphql.GraphQLID
    },
    username: {
      type: graphql.GraphQLString
    },
    password: {
      type: graphql.GraphQLString
    },
    name: {
      type: graphql.GraphQLString
    },
    address: {
      type: graphql.GraphQLString
    },
    email: {
      type: graphql.GraphQLString
    }
  }
});

const queryType = new graphql.GraphQLObjectType({
  name: "Query",
  fields: {
    user: {
      type: UserType,
      args: {
        id: {
          type: new graphql.GraphQLNonNull(graphql.GraphQLID)
        }
      },
      resolve: (root, { id }, context, info) => {
        return new Promise((resolve, reject) => {
          db.dbConfig.query(
            "SELECT * FROM `user` WHERE `id` = ?",
            [id],
            (error, results, fields) => {
              if (error) {
                console.log("Error: ", error);
                reject(error);
                return;
              }
              resolve(results[0]);
            }
          );
        });
      }
    }
  }
});

const mutationType = new graphql.GraphQLObjectType({
  name: "Mutation",
  fields: {
    createUser: {
      type: UserType,
      args: {
        username: {
          type: new graphql.GraphQLNonNull(graphql.GraphQLString)
        },
        password: {
          type: new graphql.GraphQLNonNull(graphql.GraphQLString)
        },
        name: {
          type: new graphql.GraphQLNonNull(graphql.GraphQLString)
        },
        address: {
          type: new graphql.GraphQLNonNull(graphql.GraphQLString)
        },
        email: {
          type: new graphql.GraphQLNonNull(graphql.GraphQLString)
        }
      },
      resolve: (root, { username, password, name, address, email }) => {
        return new Promise((resolve, reject) => {
          const data = { username, password, name, address, email };
          db.dbConfig.query(
            "INSERT INTO user SET ?",
            data,
            (error, results, fields) => {
              if (error) {
                console.log("Error : ", error);
                reject(error);
                return;
              }
              resolve({
                ...data,
                id: results.insertId
              });
            }
          );
        });
      }
    }
  }
});

module.exports = {
  queryType,
  mutationType
};
