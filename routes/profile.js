const express = require('express');
const router = express.Router();
const { doQuery } = require('../database');
const cookieParser = require("cookie-parser");
const { validateJWT } = require('../middleware');
const jwt_decoder = require('jwt-decode');

router.use(cookieParser());

router.get("/", validateJWT, async (req, res) => {
    const name = (jwt_decoder(req.cookies["access-token"])).userName;
    const result = await doQuery(`SELECT * FROM checkouts WHERE byUser = ? AND status = 'issued'`, name);
    console.log(result);
    const result1 = await doQuery(`SELECT * FROM checkouts WHERE byUser = ? AND status = 'checkinDenied'`, name);
    const isAdmin = (await doQuery(`SELECT * FROM users WHERE username = ?`, name))[0].isAdmin;
    res.render(isAdmin?"adminProfile":"userProfile", {name: name, data: result, data1: result1});
});

module.exports = router;