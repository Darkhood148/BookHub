const express = require('express');
const { doQuery } = require('./database');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const jwt_decoder = require("jwt-decode");

function validateJWT(req, res, next) {
    if(!req.cookies["access-token"]||!jwt.verify(req.cookies["access-token"], process.env.JWT_SECRET))
    res.send("Not Authorized");
    else
    next();
}

async function validateAdmin(req, res, next) {
    const token = req.cookies["access-token"];
    const data = jwt_decoder(token);
    const query = await doQuery("SELECT * FROM users WHERE username = ?", [data.userName]);
    console.log(query);
    if(query[0].isAdmin == '0')
    res.send("You need admin permissions to access this page");
    else
    next();
}

module.exports = {
    validateJWT,
    validateAdmin
}