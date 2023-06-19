const express = require('express');
const router = express.Router();
const cookieParser = require("cookie-parser");
const jwt = require('jsonwebtoken');

router.use(cookieParser());

router.get("/", (req, res) => {
    if (!req.cookies["access-token"] || !jwt.verify(req.cookies["access-token"], process.env.JWT_SECRET)){
        res.send("PLEASE SIGNUP/LOGIN FIRST")
    }
    else{
    res.cookie("access-token", "", {
        maxAge: 1
    });
    res.send("LOGGED OUT");}
});

module.exports = router;