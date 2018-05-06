const request = require('supertest');
const moment = require('moment-timezone');
const chai = require('chai');
const superagent = require('superagent');

const agent = superagent.agent();

const { admin } = require('../../server/config/secret');
const server = require('../../server');
const Seed = require('../../server/dummyData');

const expect = chai.expect;

let token;

function login(request, done) {
  request(server)
    .post('/api/auth/login')
    .send(admin)
    .end((err, res) => {
      if (err) {
        throw err;
      }
      expect(res.body.token).to.be.an('string');
      expect(res.statusCode).to.be.equal(200);
      token = res.body.token;
      done();
    });
}

describe('Roles APIs', () => {
  let agent;

  beforeEach(done => login(request, done));

  test('Should load all available roles', (done) => {
    request(server)
      .get('/api/roles')
      .set('Authorization', token)
      .end((err, res) => {
        expect(res.body.roles).to.be.an('array');
        expect(res.statusCode).to.be.equal(200);
        done();
      });
  }, 5000);

  test('Should add a new rol', (done) => {
    request(server)
      .post('/api/roles')
      .set('Authorization', token)
      .send({
        rol: {
          name: '$$$RolTesting$$$',
        },
      })
      .end((err, res) => {
        expect(res.statusCode).to.be.equal(201);
        done();
      });
  });
});
