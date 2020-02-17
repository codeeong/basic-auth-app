const express = require('express');

const router = express.Router();
var User = require('../models/models').User;
var VerificationToken = require('../models/models').VerificationToken;

router.post('/verify-email', (req, res) => {
  return User.findOne({
    where: { email: req.body.email }
  })
    .then(user => {
      if (user.isVerified) {
        return res.status(202).send({errors: [{msg: 'Email has already been verified. Please log in'}]});
      } else {
        return VerificationToken.findOne({
          where: { token: req.body.token }
        })
          .then((foundToken) => {
            if(foundToken){
              return user.update({ isVerified: true })
                .then(() => {
                  return res.status(200).send();
                })
                .catch(() => {
                  return res.status(403).send({errors: [{msg: 'Verification failed :('}]});
                });
            } else {
              return res.status(401).send({errors: [{msg: 'Wrong verification token!'}]});
            }
          })
          .catch(() => {
            return res.status(401).send({errors: [{msg: 'Wrong verification token!'}]});
          });
      }
    })
    .catch(() => {
      return res.status(401).json(`Account not created yet!`);
    });
});

module.exports = router;