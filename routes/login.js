const express = require('express');
const router = express.Router();
const {doQuery} = require('../database');


  router.get("/", (req, res) => {
    res.render("login");
  });

  router.post("/", async (req, res) => {
    const userName = req.body.userName;
    const fullName = req.body.fullName;
    const isAdmin = req.body.isAdmin;
    const result = await doQuery('SELECT * FROM users WHERE username = ?', [userName]);
    // console.log(result);
    res.send(result);
  });

module.exports=router;
