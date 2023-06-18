const express = require('express');
const router = express.Router();
const { doQuery } = require('../database');
const cookieParser = require("cookie-parser");
const { validateJWT } = require('../middleware');
const jwt_decoder = require('jwt-decode');

router.use(cookieParser());

router.post("/", validateJWT, async (req, res) => {
    const { actionInfo } = req.body;
    const user = jwt_decoder(req.cookies["access-token"]).userName;
    const result = await doQuery(`SELECT * FROM checkouts WHERE ofBook = ? AND byUser = ? AND status = 'issued'`, [actionInfo, user]);
    if(result.length>0){
        await doQuery(`UPDATE checkouts SET status = 'checkinPending' WHERE ofBook = ? AND status = 'issued' AND byUser = ?`, [actionInfo, user]);
        res.send("SUCCESSFUL");
    }
    else{
        res.send("NICE TRY");
    }
});

module.exports = router;