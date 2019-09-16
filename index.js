require('dotenv').config();
const express = require('express');
const jwt = require('express-jwt');
const db = require('./connection');
const schema = require('./schema');
const PORT = 3001 || process.env.PORT;

db.connectToDatabase();

const auth = jwt({
  secret: process.env.JWT_SECRET,
  credentialsRequired: false,
});

const app = express();

app.use('*', auth);

schema.applyMiddleware({ app });

app.listen(PORT, error => {
  if (error) throw error;
  console.log(`Your graphql api server runs on http://localhost:${PORT}/graphql`);
});
