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

const profileRouter = require('./routes/profile');
app.use('/profile', profileRouter);

const addBookRouter = require('./routes/addBook');
app.use('/addBook', addBookRouter);

const changeCopiesRouter = require('./routes/changeCopies');
app.use('/changeCopies', changeCopiesRouter);

const bookListRouter = require('./routes/bookList');
app.use('/bookList', bookListRouter);

const issueBookRouter = require('./routes/issueBook');
app.use('/issueBook', issueBookRouter);

const checkRequestsRouter = require('./routes/checkRequests');
app.use('/checkRequests', checkRequestsRouter);