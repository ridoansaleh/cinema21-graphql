const mysql = require("mysql");
require("dotenv").config();

const dbConfig = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

const connectToDatabase = () => {
  dbConfig.connect(error => {
    if (error) throw error;
    console.log("Successfully connected to database");
  });
};

module.exports = {
  dbConfig,
  connectToDatabase
};
