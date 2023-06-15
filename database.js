require("dotenv").config();
const mysql = require("mysql");
const db = mysql.createConnection({
    host: '127.0.0.1',
    user: process.env.USERNAMM,
    password: process.env.PASSWORD,
    database: process.env.DATABASE
});
db.connect(function(err) {
    if (err) {
      throw err;
    }
  });
function doQuery(sql, params) {
    return new Promise((resolve, reject) => {
      db.query(sql, params, (err, result) => {
        if (err) {
          reject(err);
        } else {
          //console.log(result);
          resolve(result);
        }
      });
    });
  }
module.exports = {
    doQuery
  };