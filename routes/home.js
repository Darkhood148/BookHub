const express = require('express');
const router = express.Router();
const {doQuery} = require('../database');

router.get("/", (req, res) => {
    console.log("Hello");
    res.render("index");
  });
  
router.post("/", async (req, res) => {
    const {firstName} = req.body;
    console.log(firstName);
    const result = [2, 4];
    //console.log(result)
    for (i in result){
      console.log(i);
    }
    res.send(result);
  });   

module.exports=router;