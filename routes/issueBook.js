const express = require('express');
const router = express.Router();
const { doQuery } = require('../database');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const { validateJWT } = require('../middleware');

router.use(cookieParser());

router.get("/", validateJWT, (req, res) => {
    res.render("issueBook");
});

router.post("/", validateJWT, async (req, res) => {

});

module.exports = router;
