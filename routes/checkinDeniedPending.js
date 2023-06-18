const express = require('express');
const router = express.Router();
const { doQuery } = require('../database');
const cookieParser = require("cookie-parser");
const { validateJWT, validateAdmin } = require('../middleware');
const jwt_decoder = require('jwt-decode');

router.use(cookieParser());

router.get("/", validateJWT, validateAdmin, async (req, res) => {
    const result = await doQuery("SELECT * FROM checkouts WHERE status = 'checkinDeniedPending'");
    res.render("checkinDeniedReq", { data: result });
});

router.post("/", validateJWT, validateAdmin, async (req, res) => {
    const info = jwt_decoder(req.cookies["access-token"]);
    const { actionInfo } = req.body;
    const code = actionInfo.split("-");
    const bookid = code[1];
    console.log(actionInfo);
    if (code[3] === 'a') {
        await doQuery(`DELETE FROM checkouts WHERE ofBook = ? AND byUser = ? AND status = 'checkinDeniedPending'`, [bookid, info.userName]);
        res.send("SUCCESSFUL");
    }
    else{
        await doQuery(`UPDATE checkouts SET status = 'checkinDenied' WHERE ofBook = ? AND byUser = ? AND status = 'checkinDeniedPending'`, [bookid, info.userName]);
        res.send("SUCCESSFUL");
    }
})

module.exports = router;
