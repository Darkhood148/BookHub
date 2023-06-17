const express = require('express');
const router = express.Router();
const { doQuery } = require('../database');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");

router.use(cookieParser());

router.get("/", (req, res) => {
  res.render("login");
});

router.post("/", async (req, res) => {
  const { userName, pswd } = req.body;
  const result = await doQuery('SELECT * FROM users WHERE username = ?', [userName]);
  console.log(req.cookies);
  if (!result.length) {
    res.send("User does not exist");
  }
  else {
    const isMatch = await bcrypt.compare(pswd, result[0].hash);
    console.log(isMatch);
    if (isMatch) {
      const accessToken = jwt.sign(
        { userName: result[0].userName },
        process.env.JWT_SECRET,
      );
      console.log(accessToken);
      res.cookie("access-token", accessToken, {
        maxAge: 1000*60
      });
      res.send("Successful");
    }
    else {
      res.send("Incorrect password");
    }
  }
});

module.exports = router;
