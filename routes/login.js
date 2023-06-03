const express = require('express');
const router = express.Router();

module.exports = function(doQuery) {
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
  

  return router;
};
