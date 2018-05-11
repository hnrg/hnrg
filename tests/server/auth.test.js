const request = require('supertest');
const { expect } = require('chai');

const server = require('../../server');
const Seed = require('../../server/dummyData');
const Rol = require('../../server/models/rol');
const User = require('../../server/models/user');

(function cleanAndSeedDb() {
  User.remove({});
  Rol.remove({});
  Seed();
})();

describe('Login Tests', () => {
    test('should return the token if valid', (done) => {
      request(server)
        .post('/api/auth/login')
        .send({
          email: 'admin@hnrg.com',
          password: 'admin',
        })
        .end((err, res) => {
          const { token } = res.body;
          expect(token).to.be.an('string');
          expect(res.statusCode).to.be.equal(200);
          done();
        });
    });
});
