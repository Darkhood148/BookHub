require("dotenv").config();
const mysql = require("mysql");
module.exports = mysql.createConnection({
    host: '127.0.0.1',
    user: process.env.USERNAMM,
    password: 'StupidCamel@2004',
    database: 'bookhub'
});