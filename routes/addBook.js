const express = require('express');
const router = express.Router();
const { doQuery } = require('../database');
const cookieParser = require("cookie-parser");
const {validateJWT, validateAdmin} = require("../middleware");

router.use(cookieParser());

router.get("/", validateJWT, validateAdmin, (req, res) => {
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
        await doQuery(`UPDATE books SET copiesAvailable = copiesAvailable + ? WHERE name = ? AND author = ?`, [copies, bookName, fullName]);
        res.send("Book already existed. Added Copies");
    }
});

module.exports = router;
