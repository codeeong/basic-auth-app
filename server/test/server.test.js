const supertest = require('supertest')
const app = require('../server')
const request = supertest(app)

var User = require('../models/models').User;
var VerificationToken = require('../models/models').VerificationToken;

let server
const TEST_EMAIL = 'test@email.com'
const TEST_PW = 'passwordHash'

beforeEach((done) => {
  server = app.listen(done)
})

afterEach((done)=> {
  done();
  server.close()
})

describe('Get endpoints', () => {
  it('get logout should work', async () => {
    const res = await request.get('/logout')
    expect(res.statusCode).toEqual(200)
    expect(res.body).toHaveProperty('isLoggedIn')
  })

  it('get session should work', async () => {
    const res = await request.get('/check-session')
    expect(res.statusCode).toEqual(200)
    expect(res.body.isLoggedIn).toEqual(false)
  })
})

describe('API endpoints', () => {
  it('sigup endpoint should work', async () => {
    const res = await request
      .post('/api/signup')
      .send({
        email: TEST_EMAIL,
        passwordHash: TEST_PW,
      })
    expect(res.statusCode).toEqual(200)
  })

  it('sigup should not work if email exists', async () => {
    const res = await request
      .post('/api/signup')
      .send({
        email: TEST_EMAIL,
        passwordHash: TEST_PW,
      })
    expect(res.statusCode).toEqual(409)
    expect(res.body.errors[0].msg).toEqual('This email is already in use!')
  })

  it('verify-email endpoint should work', () => {
    let userToken;
    return User.findOne({
      where: { email: TEST_EMAIL }
    })
    .then((user) => {
      return VerificationToken.findOne({
        where: { userId: user.id}
      })
      .then( async (token) => {
        userToken = token.token
        const res = await request
          .post('/api/verify-email')
          .send({
            email: TEST_EMAIL,
            token: userToken,
          })
        expect(res.statusCode).toEqual(200)
      })
    })
  })

  it('login should not work if user has been verified', async () => {
    const res = await requests
      .post('/api/login')
      .send({
        email: TEST_EMAIL,
        passwordHash: TEST_PW,
      })
    expect(res.statusCode).toEqual(200)
  })
})