/*
Only for checkin and checkout requests. Another page for checkinDenied books
 */
const express = require('express');
const router = express.Router();
const { doQuery } = require('../database');
const cookieParser = require("cookie-parser");
const { validateJWT, validateAdmin } = require('../middleware');

router.use(cookieParser());

router.get("/", validateJWT, validateAdmin, async (req, res) => {
    const result = await doQuery("SELECT * FROM checkouts WHERE status = 'pending' OR status = 'checkinPending'");
    res.render("checkRequests", {data: result});
});

router.post("/", validateJWT, validateAdmin, async (req, res) => {
    const { actionInfo } = req.body;
    console.log(req.body);
    const code = actionInfo.split("-");
    const bookid=code[1];
    const user=code[2];
    if(code[3]==='a'&&code[0]==='p'){ //approving checkout request
        await doQuery(`UPDATE checkouts SET status = 'issued' WHERE ofBook = ? AND byUser = ?;`, [bookid, user]);
        res.send("SUCCESSFUL");
    }
    else if(code[3]==='a'&&code[0]==='c'){ //approving checkin request
        await doQuery(`DELETE FROM checkouts WHERE ofBook = ? AND byUser = ?;`, [bookid, user]);
        await doQuery(`UPDATE books SET copiesAvailable = copiesAvailable + 1 WHERE bookid = ?`, [bookid]);
        res.send("SUCCESSFUL");
    }
    else if(code[3]==='d'&&code[0]==='p'){ //denying checkout request
        await doQuery(`DELETE FROM checkouts WHERE ofBook = ? AND byUser = ?;`, [bookid, user]);
        await doQuery(`UPDATE books SET copiesAvailable = copiesAvailable + 1 WHERE bookid = ?`, [bookid]);
        res.send("SUCCESSFUL");
    }
    else{ //denying checkin request
        await doQuery(`UPDATE checkouts SET status = 'checkinDenied' WHERE ofBook = ? AND byUser = ?`, [bookid, user]);
    }
})

module.exports = router;