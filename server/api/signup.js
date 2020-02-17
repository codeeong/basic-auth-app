const express = require('express');
const { check, validationResult } = require('express-validator');
const {
  sessionChecker,
  sendVerificationEmail,
  generateRandomString,
  generatePasswordHash
} = require('./helpers');
const crypto = require('crypto');

const router = express.Router();
var User = require('../models/models').User;
var VerificationToken = require('../models/models').VerificationToken;

router.route('/signup')
  .post([
    // make sure email is an email type
    check('email').isEmail().normalizeEmail(),
  ], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log(errors)
      return res.status(422).json({ errors: errors.array() }).send();
    }
    const email = req.body.email
    const password = req.body.passwordHash;
    User.findOne({ where: { email: email } })
      .then(user => {
        if (!user) {
          console.log('creating user!')
          const salt = generateRandomString(16);
          // hash the password that is sent from the client side with pbkdf2 for greater security
          // const hashedPassword = generatePasswordHash(password, salt);
          const hashedPassword = generatePasswordHash(password, salt);
          console.log(hashedPassword)
          // create user
          User.create({
            email: email,
            password: hashedPassword,
            salt: salt,
            isVerified: false
          })
          .then(user => {
            console.log('user created!')
            console.log(user.email)
            const token = generateRandomString(32);
            // create verification token to be sent
            VerificationToken.create({
              userId: user.id,
              token: token
            }).then((vt) => {
              console.log('verification token created!')
              console.log(vt.token)
              sendVerificationEmail(user.email, vt.token);
              return res.status(200).send()
            })
          })
          .catch(error => {
            return res.status(500).send(error);
          })
        } else {
          res.status(409).send({errors: [{msg: 'This email is already in use!'}]})
        }
      })
      .catch(error => {
        return res.status(500).send(error);
      });
  });

module.exports = router;