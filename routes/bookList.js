const express = require('express');
const router = express.Router();
const { doQuery } = require('../database');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");

router.use(cookieParser());

router.get("/", async (req, res) => {
    const result = await doQuery("SELECT * FROM books");
    res.render("bookList", {data: result});
});

module.exports = router;
