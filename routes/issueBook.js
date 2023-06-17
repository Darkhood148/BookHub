const express = require('express');
const router = express.Router();
const { doQuery } = require('../database');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");

router.use(cookieParser());

router.get("/", (req, res) => {
    res.render("issueBook");
});

router.post("/", async (req, res) => {

});

module.exports = router;
