const express = require('express');
const router = express.Router();

router.get("/", (req, res) => {
    res.cookie("access-token", "", {
        maxAge: 1
    });
    res.send("LOGGED OUT");
});

module.exports = router;