const request = require('supertest');
const moment = require('moment-timezone');

const server = require('../../server');
const Seed = require('../../server/dummyData');
const Appointment = require('../../server/models/appointment');

const cleanAndSeedDb = async function() {
  await Appointment.remove({});
  await Seed();
};

describe('Appointment APIs', () => {
  beforeEach(async function() {
    await cleanAndSeedDb();
  });

  test('Should load available appointments for a date', async function() {
    const response = await request(server).get(`/api/turnos/${moment().add(1, 'days').format("YYYY-MM-DD")}`);
    expect(response.statusCode).toBe(200);
  }, 5000);

  test('Should load all available appointments', async function() {
    const response = await request(server).get('/api/turnos');
    expect(response.statusCode).toBe(200);
  }, 5000);

  test('Should load available appointments for a previous date', async function() {
    const response = await request(server).get(`/api/turnos/${moment().add(-1, 'days').format("YYYY-MM-DD")}`);
    expect(response.statusCode).toBe(204);
  }, 5000);

  test('Should add a new appointment', async function() {
    const appointmentObj = {};
    const date = moment()
      .add(2, 'days')
      .hours(16)
      .minutes(30)
      .seconds(0);

    appointmentObj.appointment = {
      documentNumber: 40081109,
      date: date.format("YYYY-MM-DD"),
      time: date.format("HH:mm:ss"),
    };

    const response = await request(server).post('/api/turnos').send(appointmentObj);
    expect(response.statusCode).toBe(201);
  }, 5000);
});
