const express = require('express');
var session = require('express-session');
const bodyParser = require('body-parser')
var cookieParser = require('cookie-parser');
const path = require('path');

const app = express();

const {
  sessionChecker
} = require('./api/helpers');
const login = require('./api/login');
const verifyEmail = require('./api/verifyEmail');
const signup = require('./api/signup');

app.use(express.static(path.join(__dirname, 'build')));
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});
// init cookie-parser
app.use(cookieParser());

// create cookie for current session
app.use(session({
  key: 'user_sid',
  secret: 'cute keyboard cat',
  resave: false,
  saveUninitialized: false,
  cookie: {
    expires: 600000
  }
}));

// auto logout if user does not exist but cookie exists
app.use((req, res, next) => {
  if (req.cookies.user_sid && !req.session.user) {
    res.clearCookie('user_sid');
  }
  next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api', signup);
app.use('/api', login);
app.use('/api', verifyEmail);

// endpoint to check if in session
app.route('/check-session')
  .get(sessionChecker, (req, res) => {
    res.status(200).send({ isLoggedIn: false });
  })

app.get('/logout', (req, res) => {
  res.clearCookie('user_sid');
  req.session.user = null
  res.status(200).send({ isLoggedIn: false });
})

module.exports = app
