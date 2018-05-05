const request = require('supertest');
const moment = require('moment-timezone');
const chai = require('chai');

const server = require('../../server');
const Seed = require('../../server/dummyData');

const expect = chai.expect;

describe('Login Tests', () => {
  describe('Successes', () => {
    it('should return the token if valid', (done) => {
      request(server)
        .post('/api/auth/login')
        .send({
          email: 'admin@hnrg.com',
          password: 'admin',
        })
        .end((err, res) => {
          expect(res.body.token).to.be.an('string');
          expect(res.statusCode).to.be.equal(200);
          done();
        });
    });
  });
});
