const sessionChecker = (req, res, next) => {
  if (req.session.user && req.cookies.user_sid) {
      res.status(200).send({ isLoggedIn: true, user: req.session.user});
  } else {
      next();
  } 
}
const sendVerificationEmail = (sendTo, token) => {
  const sgMail = require('@sendgrid/mail');
  sgMail.setApiKey(process.env.SENDGRID_API_KEY)
  const hostUrl = 'http://localhost:3000';
  const msg = {
      from:  'no-reply@example.com',
      to: sendTo,
      subject:"Verify Your Email Address",
      content: [
        {
          type: 'text/plain',
          value: `Verify your email ${hostUrl}/verify-email?token=${token}&email=${sendTo}`
        }
      ]
  }
  sgMail.send(msg);
  console.log('sent email')
  return;
}

const crypto = require('crypto');

const generateRandomString = (length) => {
  return crypto.randomBytes(Math.ceil(length / 2)).toString('hex').slice(0, length);
}

const generatePasswordHash = (password, salt) => {
  const hashedPw = crypto.pbkdf2Sync(password, salt, 100000, 64, 'sha512');
  console.log(hashedPw)
  return hashedPw.toString('hex')
}

const validPassword = (inputPw, salt, realPw) => {
  const hashedPw = crypto.pbkdf2Sync(inputPw, salt, 100000, 64, 'sha512');
  console.log(hashedPw.toString('hex'))
  // return whether computed hash is same as hash stored in db
  return hashedPw.toString('hex') == realPw;
}

module.exports = { 
  sessionChecker,
  sendVerificationEmail,
  generateRandomString,
  generatePasswordHash,
  validPassword
};