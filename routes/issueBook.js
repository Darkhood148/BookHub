const express = require('express');
const router = express.Router();
const { doQuery } = require('../database');
const cookieParser = require("cookie-parser");
const { validateJWT } = require('../middleware');
const jwt_decoder = require("jwt-decode");

router.use(cookieParser());

router.get("/", validateJWT, (req, res) => {
    res.render("issueBook");
});

router.post("/", validateJWT, async (req, res) => {
    const { bookid } = req.body;
    const bookinfo = await doQuery("SELECT * FROM books WHERE bookid = ?", [bookid]);
    console.log(bookinfo[0]);
    console.log(bookinfo[0].copiesAvailable);
    console.log(typeof(bookinfo[0].copiesAvailable));
    if (bookinfo.length && bookinfo[0].copiesAvailable > 0) {
        const token = jwt_decoder(req.cookies["access-token"]);
        const result = await doQuery("SELECT * FROM users WHERE username = ?;", [token.userName]);
        const name = result[0].username;
        await doQuery("INSERT INTO checkouts (ofBook, byUser, status) VALUES (?, ?, ?)", [bookid, name, "pending"]);
        await doQuery(`UPDATE books SET copiesAvailable = ${parseInt(bookinfo[0].copiesAvailable) - 1} WHERE bookid = ?`, [bookid]);
        res.send("SUCCESSFUL");
    }
    else if(bookinfo[0].length<1){
        res.send("Invalid Book ID");
    }
    else{
        res.send("Book Copies not available");
    }
});

module.exports = router;
