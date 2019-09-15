const db = require("./connection");
const bcrypt = require("bcrypt");
const jsonwebtoken = require("jsonwebtoken");
require("dotenv").config();

const saltRounds = 10;

const resolvers = {
  Query: {
    async profile(_, args, { user }) {
      console.log("query user: ", user);
      if (!user) {
        throw new Error("You are not authenticated");
      }
      const id = 5;
      return new Promise((resolve, reject) => {
        db.dbConfig.query(
          "SELECT * FROM user WHERE id = ?",
          [id],
          (error, results, fields) => {
            if (error) {
              console.error("Error getProfile: ", error);
              reject(error);
              return;
            }
            resolve(results[0]);
          }
        );
      });
    }
  },
  Mutation: {
    async signup(_, { username, password, email, name, address }) {
      const data = {
        username,
        password: await bcrypt.hash(password, saltRounds),
        email,
        name,
        address
      };
      return new Promise((resolve, reject) => {
        db.dbConfig.query(
          "INSERT INTO user SET ?",
          data,
          (error, results, fields) => {
            if (error) {
              console.error("Error Signup: ", error);
              reject(error);
              return;
            }
            resolve(
              jsonwebtoken.sign(
                {
                  id: results.insertId,
                  username: data.username
                },
                process.env.JWT_SECRET,
                { expiresIn: "1y" }
              )
            );
          }
        );
      });
    },
    async login(_, { username, password }) {
      return new Promise((resolve, reject) => {
        db.dbConfig.query(
          "SELECT * FROM `user` WHERE `username` = ?",
          [username],
          async (error, results, fields) => {
            if (error) {
              console.error("Error Login: ", error);
              reject(error);
              return;
            }
            if (!results.length) {
              reject("No user with that username");
            }
            const isPasswordValid = await bcrypt.compare(
              password,
              results[0].password
            );
            if (!isPasswordValid) {
              reject("Incorrect password");
            }
            resolve(
              jsonwebtoken.sign(
                {
                  id: results.insertId,
                  username: username
                },
                process.env.JWT_SECRET,
                { expiresIn: "1d" }
              )
            );
          }
        );
      });
    }
  }
};

module.exports = resolvers;
