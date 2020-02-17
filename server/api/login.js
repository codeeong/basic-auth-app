const express = require('express');
const {
  validPassword
} = require('./helpers');

const router = express.Router();
var User = require('../models/models').User;

// route for user Login
router.route('/login')
    .post((req, res) => {
      const email = req.body.email
      const password = req.body.passwordHash

        User.findOne({ where: { email: email } })
          .then((user) => {
            if (user == null) {
                console.log('no user')
                return res.status(401).send({errors: [{msg: 'Either email or password is wrong'}]})
            } else {
              if (!user.isVerified) {
                return res.status(403).send({errors: [{msg: 'Please verify your email before logging in!'}]})                  
              }
              const isPasswordValid = validPassword(password, user.salt, user.password)
              if (!isPasswordValid) {
                return res.status(401).send({errors: [{msg: 'Either email or password is wrong'}]})
              } else if (user.isVerified && isPasswordValid) {
                req.session.user = user.email;
                return res.status(200).send({message: 'Valid user!'})
              }
            }
          })
          .catch(() => {
            return res.status(401).send({errors: [{msg: 'Login failed! Please try again'}]});
          });
    });

module.exports = router;
