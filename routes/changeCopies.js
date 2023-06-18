const express = require('express');
const router = express.Router();
const { doQuery } = require('../database');
const cookieParser = require("cookie-parser");
const { validateJWT, validateAdmin } = require("../middleware");

router.use(cookieParser());

router.get("/", validateJWT, validateAdmin, (req, res) => {
    res.render("changeCopies");
});

router.post("/", validateJWT, validateAdmin, async (req, res) => {
    const { bookid, option, copies } = req.body;
    const result = await doQuery("SELECT * FROM books WHERE bookid = ?", [bookid]);
    if (result.length === 0) {
        res.send("Book DNE");
    }
    else {
        if (option === 'A') {
            await doQuery(`UPDATE books SET copiesAvailable = ${parseInt(result[0].copiesAvailable) + parseInt(copies)} WHERE bookid = ?`, [bookid]);
            res.send("SUCCESS");
        }
        else if (option === 'S') {
            if (copies > 0) {
                await doQuery(`UPDATE books SET copiesAvailable = ? WHERE bookid = ?`, [copies, bookid]);
                res.send("SUCCESS");
            }
            else {
                await doQuery(`DELETE FROM books WHERE bookid = ?`, [bookid]);
                res.send("Book Deleted");
            }
        }
        else if (option === 'D') {
            if (parseInt(result[0].copiesAvailable) - parseInt(copies) > 0) {
                await doQuery(`UPDATE books SET copiesAvailable = ${parseInt(result[0].copiesAvailable) - parseInt(copies)} WHERE bookid = ?`, [bookid]);
                res.send("SUCCESS");
            }
            else {
                await doQuery(`DELETE FROM books WHERE bookid = ?`, [bookid]);
                res.send("Book Deleted");
            }
        }
        else {
            res.send("Invalid");
        }
    }
});

module.exports = router;
