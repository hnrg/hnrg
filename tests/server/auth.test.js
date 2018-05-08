const request = require('supertest');
const { expect } = require('chai');

const server = require('../../server');
const Seed = require('../../server/dummyData');
const Rol = require('../../server/models/rol');
const User = require('../../server/models/user');

const cleanAndSeedDb = async function cleanAndSeedDb() {
  await User.remove({});
  await Rol.remove({});
  await Seed();
};

describe('Login Tests', () => {
  describe('Successes', () => {
    beforeEach(async () => {
      await cleanAndSeedDb();
    });

    test('should return the token if valid', (done) => {
      request(server)
        .post('/api/auth/login')
        .send({
          email: 'admin@hnrg.com',
          password: 'admin',
        })
        .end((err, res) => {
          const token = res.body;
          expect(token).to.be.an('string');
          expect(res.statusCode).to.be.equal(200);
          done();
        });
    });
  });
});
