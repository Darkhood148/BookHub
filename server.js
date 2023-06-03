const express = require("express");
const app = express();
const jwt = require('jsonwebtoken');
const db = require("./database");

app.listen(3000);
app.use(express.urlencoded({ limit: '10kb', extended: true }));

db.connect(function(err) {
  if (err) {
    throw err;
  }
});

function doQuery(sql, params) {
  return new Promise((resolve, reject) => {
    db.query(sql, params, (err, result) => {
      if (err) {
        reject(err);
      } else {
        console.log(result);
        resolve(result);
      }
    });
  });
}
app.set("view engine", "ejs");

const loginRouter = require('./routes/login')(doQuery);
app.use('/login', loginRouter);

app.get("/", (req, res) => {
  console.log("Hello");
  res.render("index");
});

app.post("/", async (req, res) => {
  console.log(req.body.firstName);
  const result = [2, 4];
  //console.log(result)
  for (i in result){
    console.log(i);
  }
  res.send(result);
});
