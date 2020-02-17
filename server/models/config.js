const DATABASE_NAME_DEV='bambuauthchallenge';
const DATABASE_NAME_TEST='bambuauthchallengetest';
const USERNAME='root';
const PASSWORD='password';
const HOST='localhost';
const DIALECT='mysql';

module.exports = {
  development: {
    DATABASE_NAME: DATABASE_NAME_DEV,
    USERNAME: USERNAME,
    PASSWORD: PASSWORD,
    HOST: HOST,
    DIALECT: DIALECT
  },
  test: {
    DATABASE_NAME: DATABASE_NAME_TEST,
    USERNAME: USERNAME,
    PASSWORD: PASSWORD,
    HOST: HOST,
    DIALECT: DIALECT
  }

}