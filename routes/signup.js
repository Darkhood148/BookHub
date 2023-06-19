const express = require('express');
const router = express.Router();
const { doQuery } = require('../database');
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const jwt = require('jsonwebtoken');

router.use(cookieParser());

async function hashPassword(password) {
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const hash = await bcrypt.hash(password, salt);
  
    return {
      salt: salt,
      hash: hash,
    };
  }

router.get("/", (req, res) => {
    if(!req.cookies["access-token"]||!jwt.verify(req.cookies["access-token"], process.env.JWT_SECRET))
    res.render("signup");
    else
    res.send("PLEASE LOGOUT FIRST");
});

router.post("/", async(req, res) => {
    const {userName, fullName, pswd, cpswd, isAdmin} = req.body;
    if (!req.cookies["access-token"] || !jwt.verify(req.cookies["access-token"], process.env.JWT_SECRET)){
    const result = await doQuery('SELECT * FROM users WHERE username = ?;', [userName]);
    if (!result.length) {
        if (pswd === cpswd) {
            let adm = false;
            if(isAdmin==='Y')
            adm=true;
            const {salt, hash} = await hashPassword(pswd);
            await doQuery('INSERT INTO users VALUES (?, ?, ?, ?, ?);', [userName, fullName, salt, hash, adm]);
            res.redirect("/login");
        }
        else {
            res.send("pswds dont match");
        }
    }
    else {
        res.send("User Already Exists");
    }
}
else{
    res.send("PLEASE LOGOUT FIRST");
}
});

module.exports = router;