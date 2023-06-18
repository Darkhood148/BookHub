const { compareSync } = require('bcrypt');
const { doQuery } = require('./database');
const jwt = require("jsonwebtoken");
const jwt_decoder = require("jwt-decode");

function validateJWT(req, res, next) {
    if(!req.cookies["access-token"]||!jwt.verify(req.cookies["access-token"], process.env.JWT_SECRET))
    res.send("Not Authorized");
    else
    next();
}

async function validateAdmin(req, res, next) {
    console.log("Entered Middleware");
    console.log(req.body);
    console.log(req.cookies["access-token"]);
    const token = req.cookies["access-token"];
    const data = jwt_decoder(token);
    const query = await doQuery("SELECT * FROM users WHERE username = ?", [data.userName]);
    if(query[0].isAdmin == '0')
    res.send("You need admin permissions to access this page");
    else
    next();
}

module.exports = {
    validateJWT,
    validateAdmin
}