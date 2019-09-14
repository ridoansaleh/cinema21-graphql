const mysql = require("mysql");

const dbConfig = mysql.createConnection({
  host: "localhost",
  user: "ridoan",
  password: "mantap",
  database: "cinema21"
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
