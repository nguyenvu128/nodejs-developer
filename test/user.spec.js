// Require the dev-dependencies
const chai = require('chai')
const chaiHttp = require('chai-http')
const server = require('../app')
// eslint-disable-next-line no-unused-vars
const should = chai.should()

chai.use(chaiHttp)
// Our parent block
describe('Users', () => {
  beforeEach((done) => {
    // Before each test we empty the database in your case
    done()
  })
  /**
   * Test the /GET route
   */
  describe('/GET localhost:3000', () => {
    it('it should GET all the response message not found', (done) => {
      chai.request(server)
        .get('/')
        .end((_err, res) => {
          res.should.have.status(404)
          res.body.should.be.an('object')
          res.body.should.have.property('message').eql('Not Found')
          done()
        })
    })
  })

  /**
   * Test the /POST route
   */
  describe('/POST localhost:3000', () => {
    it('it should GET all the response message not found', (done) => {
      chai.request(server)
        .post('/')
        .end((_err, res) => {
          res.should.have.status(404)
          res.body.should.be.an('object')
          res.body.should.have.property('message').eql('Not Found')
          done()
        })
    })
  })

  describe('/POST sign-up user', () => {
    it('it should POST input body to sign-up user and response error message with conflict email', (done) => {
      const user = {
        email: 'abc789@gmail.com',
        password: '12345678',
        firstName: 'test',
        lastName: 'api'
      }

      chai.request(server)
        .post('/sign-up')
        .send(user)
        .end((_err, res) => {
          res.should.have.status(400)
          res.body.should.be.an('object')
          res.body.should.have.property('message').eql('Email already exist')
          done()
        })
    })
  })

  describe('/POST sign-up user', () => {
    it('it should POST input body to sign-up user and response data of user', (done) => {
      const emailNuber = Math.floor(Math.random() * 100)
      const user = {
        email: `abc${emailNuber}@gmail.com.com`,
        password: '12345678',
        firstName: 'test',
        lastName: 'api'
      }

      chai.request(server)
        .post('/sign-up')
        .send(user)
        .end((_err, res) => {
          res.should.have.status(201)
          res.body.should.be.an('object')
          res.body.should.have.property('data').be.an('object')
          res.body.data.should.have.property('id').eql(res.body.data.id)
          res.body.data.should.have.property('email').eql(user.email)
          res.body.data.should.have.property('firstName').eql(user.firstName)
          res.body.data.should.have.property('lastName').eql(user.lastName)
          res.body.data.should.have.property('displayName').eql(`${user.firstName} ${user.lastName}`)
          done()
        })
    })
  })

  describe('/POST sign-up user', () => {
    it('it should POST input body to sign-up user and response error message empty field email', (done) => {
      const user = {
        email: '',
        password: '12345678',
        firstName: 'test',
        lastName: 'api'
      }

      chai.request(server)
        .post('/sign-up')
        .send(user)
        .end((_err, res) => {
          res.should.have.status(400)
          res.body.should.be.an('object')
          res.body.should.have.property('messages')
          res.body.messages[0].should.eql('"email" is not allowed to be empty')
          done()
        })
    })
  })

  describe('/POST sign-up user', () => {
    it('it should POST input body to sign-up user and response error message invalid email format', (done) => {
      const user = {
        email: 'abc',
        password: '12345678',
        firstName: 'test',
        lastName: 'api'
      }

      chai.request(server)
        .post('/sign-up')
        .send(user)
        .end((_err, res) => {
          res.should.have.status(400)
          res.body.should.be.an('object')
          res.body.should.have.property('messages')
          res.body.messages[0].should.eql('"email" must be a valid email')
          done()
        })
    })
  })

  describe('/POST sign-up user', () => {
    it('it should POST input body to sign-up user and response error message password at least 8 characters', (done) => {
      const user = {
        email: 'abc@abc.com',
        password: '123456',
        firstName: 'test',
        lastName: 'api'
      }

      chai.request(server)
        .post('/sign-up')
        .send(user)
        .end((_err, res) => {
          res.should.have.status(400)
          res.body.should.be.an('object')
          res.body.should.have.property('messages')
          res.body.messages[0].should.eql('"password" length must be at least 8 characters long')
          done()
        })
    })
  })

  describe('/POST sign-in user', () => {
    it('it should POST input body to sign-in user and response data of user', (done) => {
      const userInput = {
        email: 'abc789@gmail.com',
        password: '12345678'
      }

      chai.request(server)
        .post('/sign-in')
        .send(userInput)
        .end((_err, res) => {
          res.should.have.status(200)
          res.body.should.be.an('object')
          res.body.should.have.property('user').be.an('object')
          res.body.user.should.have.property('id').eql(res.body.user.id)
          res.body.user.should.have.property('email').eql(res.body.user.email)
          res.body.user.should.have.property('firstName').eql(res.body.user.firstName)
          res.body.user.should.have.property('lastName').eql(res.body.user.lastName)
          res.body.user.should.have.property('displayName').eql(`${res.body.user.firstName} ${res.body.user.lastName}`)
          res.body.should.have.property('token').eql(res.body.token)
          res.body.should.have.property('refreshToken').eql(res.body.refreshToken)
          describe('/POST get refresh-token', () => {
            it('it should POST input body to get new refresh token and new token', (done) => {
              const input = { refreshToken: res.body.refreshToken }
              chai.request(server)
                .post('/refresh-token')
                .send(input)
                .end((_err, response) => {
                  response.should.have.status(200)
                  response.body.should.be.an('object')
                  response.body.should.have.property('token').eql(response.body.token)
                  response.body.should.have.property('refreshToken').eql(response.body.refreshToken)
                  done()
                })
            })
          })
          done()
        })
    })
  })

  describe('/POST sign-in user', () => {
    it('it should POST input body to sign-in user and response error message email or password incorrect', (done) => {
      const userInput = {
        email: 'abc789@gmail.com.com',
        password: '12345678'
      }

      chai.request(server)
        .post('/sign-in')
        .send(userInput)
        .end((_err, res) => {
          res.should.have.status(400)
          res.body.should.be.an('object')
          res.body.should.have.property('message').eql('Email or password incorrect')
          done()
        })
    })
  })

  describe('/POST sign-out user', () => {
    it('it should POST input body to sign-out user and response error message jwt expired', (done) => {
      const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFiY0BnbWFpbC5jb20iLCJpYXQiOjE2NzYzOTMxOTksImV4cCI6MTY3NjM5Njc5OX0.-3Gln8Xep0AW-qZ_4abcXWI0UydOUfHacu84dvYP-Tg'
      chai.request(server)
        .post('/sign-out')
        .auth(`${token}`, { type: 'bearer' })
        .end((_err, res) => {
          res.should.have.status(500)
          res.body.should.be.an('object')
          res.body.should.have.property('message').eql('jwt expired')
          done()
        })
    })
  })

  describe('/POST get refresh-token', () => {
    it('it should POST input body to get new refresh token and new token', (done) => {
      const input = { refreshToken: 'afd5c5f2-2506-4cb4-8b32-af9a94ed744e' }
      chai.request(server)
        .post('/refresh-token')
        .send(input)
        .end((_err, res) => {
          res.should.have.status(404)
          res.body.should.be.an('object')
          res.body.should.have.property('message').eql('Refresh token invalid')
          done()
        })
    })
  })
})
