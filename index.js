const express = require("express");
const ExpressGraphQL = require("express-graphql");
const db = require("./connection");
const schema = require("./schema");

db.connectToDatabase();

const app = express();

app.use(
  "/graphql",
  ExpressGraphQL({ schema: schema.cinema21, graphiql: true })
);

app.listen(3001, error => {
  if (error) throw error;
  console.log("Your graphql api server runs on http://localhost:3001/graphql");
});
