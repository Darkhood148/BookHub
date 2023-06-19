const express = require('express');
const router = express.Router();
const { doQuery } = require('../database');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");

router.use(cookieParser());

router.get("/", (req, res) => {
  if(!req.cookies["access-token"]||!jwt.verify(req.cookies["access-token"], process.env.JWT_SECRET))
  res.render("login");
  else
  res.send("PLEASE LOGOUT FIRST");
});

router.post("/", async (req, res) => {
  const { userName, pswd } = req.body;
  if (!req.cookies["access-token"] || !jwt.verify(req.cookies["access-token"], process.env.JWT_SECRET)){
  const result = await doQuery('SELECT * FROM users WHERE username = ?', [userName]);
  if (!result.length) {
    res.send("User does not exist");
  }
  else {
    const isMatch = await bcrypt.compare(pswd, result[0].hash);
    if (isMatch) {
      const accessToken = jwt.sign(
        { userName: userName },
        process.env.JWT_SECRET,
      );
      res.cookie("access-token", accessToken, {
        maxAge: 1000*60*15
      });
      res.redirect("/profile");
    }
    else {
      res.send("Incorrect password");
    }
  }
}
else{
  res.send("PLEASE LOGOUT FIRST")
}
});

module.exports = router;
