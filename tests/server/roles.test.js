const request = require('supertest');
const { expect } = require('chai');

const { admin } = require('../../server/config/secret');
const server = require('../../server');
const Seed = require('../../server/dummyData');
const Rol = require('../../server/models/rol');
const User = require('../../server/models/user');

let token;

function login(done) {
  request(server)
    .post('/api/auth/login')
    .send(admin)
    .end((err, res) => {
      if (err) {
        throw err;
      }
      expect(res.statusCode).to.be.equal(200);
      token = res.body.token;
      done();
    });
}

describe('Roles APIs', () => {
  beforeEach(async (done) => {
    /* await User.remove({});
    await Rol.remove({});
    await Seed(); */
    await login(done);
  });

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
