/**
 * @jest-environment node
 */
const supertest = require("supertest");
const { app, server, sequelize } = require("../index");

api = supertest(app)

/*
describe('GET /users', () => {
  test('users are returned as json', async done => {
    await api
    .get('/users')
    .expect(200)
    .expect('Content-Type', /application\/json/)
  });
});
*/

describe('GET /users', () => {
  test('users are returned as json', async () => {
    await api
      .get('/users')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  });

  test('users are returned as json', async () => {
    await api
      .get('/users')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  });
});

afterAll(() => {
  sequelize.close()
  server.close()
});
