require('dotenv').config();
const express = require('express');
const app = express()
const port = process.env.PORT || 9000
const path = require('path');

const mongoose = require('./config/mongoose');

const cookie = require('cookie-parser');
const session = require("express-session");

const passport = require('passport');
const passportLocal = require('./config/passport.local.stretergy');

const connect_mongo = require("connect-mongo");

app.use('/uploads', express.static(path.join('uploads')))

app.use(express.static('public'))  // public folder link
app.use(express.static('public/user'))  // public folder link
app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: true }))
app.use(cookie())

app.use(session({
    secret: "smitlakhani",
    saveUninitialized: true,
    resave: false,
    store: new connect_mongo({
        mongoUrl: 'mongodb://127.0.0.1/Final_project',
        collectionName: "sessions"
    }),
    cookie: {
        maxAge: 1000 * 60 * 60 // 1 hour
    }
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthentication);

app.use('/', require('./routes/user/yom.routes'))

app.listen(port)