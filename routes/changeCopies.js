const express = require('express');
const router = express.Router();
const { doQuery } = require('../database');
const cookieParser = require("cookie-parser");
const {validateJWT, validateAdmin} = require("../middleware");

router.use(cookieParser());

router.get("/", validateJWT, validateAdmin, (req, res) => {
    res.render("changeCopies");
});

router.post("/", validateJWT, validateAdmin, async (req, res) => {
    const { bookName, option, copies } = req.body;
    const result = await doQuery("SELECT * FROM books WHERE name = ?", [bookName]);
    if(result.length === 0){
        res.send("Book DNE");
    }
    else{
        if(option === 'A'){
            await doQuery(`UPDATE books SET copiesAvailable = ${parseInt(result[0].copiesAvailable) + parseInt(copies)} WHERE name = ?`, [bookName]);
            res.send("SUCCESS");
        }
        else if(option === 'S'){
            await doQuery(`UPDATE books SET copiesAvailable = ? WHERE name = ?`, [copies, bookName]);
            res.send("SUCCESS");
        }
        else if(option === 'D'){
            await doQuery(`UPDATE books SET copiesAvailable = ${parseInt(result[0].copiesAvailable) - parseInt(copies)} WHERE name = ?`, [bookName]);
            res.send("SUCCESS");
        }
        else{
            res.send("Invalid");
        }
    }
});

module.exports = router;
