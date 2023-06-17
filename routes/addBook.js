const express = require('express');
const router = express.Router();
const { doQuery } = require('../database');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const {validateJWT, validateAdmin} = require("../middleware");

router.use(cookieParser());

router.get("/", (req, res) => {
    res.render("addBook");
});

router.post("/", validateJWT, validateAdmin, async (req, res) => {
    const { bookName, fullName, copies } = req.body;
    const result = await doQuery("SELECT * FROM books WHERE name = ?", [bookName]);
    if (result.length === 0) {
        await doQuery("INSERT INTO books (name, author, copiesAvailable) VALUES (?, ?, ?);", [bookName, fullName, copies]);
        res.send("SUCCESSFUL");
    }
    else {
        res.send("Book already exists");
    }
});

module.exports = router;
