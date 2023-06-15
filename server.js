const express = require("express");
const app = express();

app.listen(3000);
app.use(express.urlencoded({ limit: '10kb', extended: true }));

app.set("view engine", "ejs");

const loginRouter = require('./routes/login');
app.use('/login', loginRouter);

const signupRouter = require('./routes/signup');
app.use('/signup', signupRouter);

const homeRouter = require('./routes/home');
app.use('/', homeRouter);