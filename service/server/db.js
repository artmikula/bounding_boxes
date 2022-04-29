require("dotenv").config();
const { DB_USERNAME, DB_PASSWORD, DB_HOST, DB_DATABASE } = process.env;
const mariadb = require("mariadb");

const pool = mariadb.createPool({
  host: DB_HOST,
  user: DB_USERNAME,
  password: DB_PASSWORD,
  database: DB_DATABASE,
});

module.exports = {
  getConnection: function () {
    return new Promise(function (resolve, reject) {
      pool
        .getConnection()
        .then(function (connection) {
          resolve(connection);
        })
        .catch(function (error) {
          reject(error);
        });
    });
  },
};
