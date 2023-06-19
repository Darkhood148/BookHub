const express = require('express');
const router = express.Router();
const cookieParser = require("cookie-parser");
const jwt = require('jsonwebtoken');

router.use(cookieParser());

router.get("/", (req, res) => {
  let data = false;
  console.log(req.body);
  if (!req.cookies["access-token"] || !jwt.verify(req.cookies["access-token"], process.env.JWT_SECRET)){
    data = true;
  }
    res.render("index", {data: data});
  }); 

module.exports=router;