const express = require('express');
const router = express.Router();
const { doQuery } = require('../database');
const bcrypt = require("bcrypt");

async function hashPassword(password) {
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const hash = await bcrypt.hash(password, salt);
    console.log('Salt:', salt);
    console.log('Hash:', hash);
  
    return {
      salt: salt,
      hash: hash,
    };
  }

router.get("/", (req, res) => {
    res.render("signup");
});

router.post("/", async(req, res) => {
    const {userName, fullName, pswd, cpswd, isAdmin} = req.body;
    console.log(req.body);
    const result = await doQuery('SELECT * FROM users WHERE username = ?;', [userName]);
    if (!result.length) {
        if (pswd === cpswd) {
            let adm = false;
            if(isAdmin==='Y')
            adm=true;
            const {salt, hash} = await hashPassword(pswd);
            await doQuery('INSERT INTO users VALUES (?, ?, ?, ?, ?);', [userName, fullName, salt, hash, adm]);
            res.send("SUCCESSFUL");
        }
        else {
            res.send("pswds dont match");
        }
    }
    else {
        res.send("User Already Exists");
    }
});

module.exports = router;