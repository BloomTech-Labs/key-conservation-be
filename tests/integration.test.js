const supertest = require('supertest');
const server = require('../app');
const db = require('../app/database/dbConfig');
const generateRandomSub = require('../util/generateRandomSub');

beforeAll(() => {
  db('users').truncate();
});

afterAll(async () => {
  db.destroy();
});

describe('campaign routes', () => {
  it(' will not let you access social route without a token', async () => {
    await supertest(server)
      .get('/api/campaigns')
      .expect(401);
  });
});


describe('campaign routes', () => {
  it(' will not let you access social route without a token', async () => {
    await supertest(server)
      .get('/api/updates')
      .expect(401);
  });
});
describe('comment route', () => {
  it('will not give a 200 without a token', async () => {
    await supertest(server)
      .get('/api/comments')
      .expect(401);
  });
});

describe('social routes', () => {
  it(' will not let you access social route without a token', async () => {
    await supertest(server)
      .get('/api/social')
      .expect(401);
  });
});

describe('it registers a new user', () => {
  it('adds a user', async () => {
    const newConservationist = {
      sub: generateRandomSub(),
      username: 'testuser',
      email: 'test@user.com',
      roles: 'conservationist',
      name: 'test',
    };

    await supertest(server)
      .post('/api/users')
      .send(newConservationist)
      .expect(201);
  });

  it('will not register a user with incomplete creds', async () => {
    const anotherNewConservationist = {
      sub: 'tu madre',
      username: 'votre maman',
    };

    await supertest(server)
      .post('/api/users')
      .send(anotherNewConservationist)
      .expect(500);
  });
});

// describe('Cons Routes', () => {
//
//   describe('GET /api/cons', () => {
//     it('should respond with 200', async () => {
//       const res = await supertest(server).get('/api/cons/');
//       expect(res.status).toBe(200);
//     });
//   });
//   it('should return an array', async () => {
//     let result;
//     await supertest(server)
//       .get('/api/cons')
//       .then((res) => result = res.body);
//     expect(result.cons.length).toEqual(0);
//   });
//   describe('GET /api/cons/:id', () => {
//     it('responds 200', async () => {
//       const save = {
//         user_id: 1,
//         lat: 1234,
//         lon: 5678,
//         address: '123 4th St.',
//       };
//
//       const { id } = await db('saves')
//         .where('lat', 1234)
//         .first();
//
//       await supertest(server)
//         .get(`/saves/${id}`)
//         .set('Authorization', token)
//         .expect('Content-Type', /json/)
//         .expect(200);
//     });
//
//     it('returns an object with the desired id', async () => {
//       const save = {
//         user_id: 1,
//         lat: 1234,
//         lon: 5678,
//         address: '123 4th St.',
//       };
//
//       await db('saves').insert(save);
//
//       const { id } = await db('saves')
//         .where('lat', 1234)
//         .first();
//
//       await supertest(server)
//         .get(`/saves/${id}`)
//         .set('Authorization', token)
//         .then((res) => (result = res.body));
//       expect(typeof result).toBe('object');
//       expect(result.id).toEqual(id);
//     });
//   });
//
//   describe('POST /', () => {
//     it('responds 201', async () => {
//       const save = {
//         user_id: 1,
//         lat: 1234,
//         lon: 5678,
//         address: '123 4th St.',
//       };
//
//       await supertest(server)
//         .post('/saves')
//         .send(save)
//         .set('Authorization', token)
//         .set('Accept', 'application/json')
//         .expect('Content-Type', /json/)
//         .expect(201);
//     });
//
//     it('returns an object', async () => {
//       const save = {
//         user_id: 1,
//         lat: 1234,
//         lon: 5678,
//         address: '123 4th St.',
//       };
//
//       let result;
//       await supertest(server)
//         .post('/saves')
//         .send(save)
//         .set('Authorization', token)
//         .set('Accept', 'application/json')
//         .then((res) => (result = res.body));
//       expect(typeof result).toBe('object');
//     });
//   });
//
//   describe('PUT /:id', () => {
//     it('responds 201', async () => {
//       const save = {
//         user_id: 1,
//         lat: 1234,
//         lon: 5678,
//         address: '123 4th St.',
//       };
//
//       const modified = {
//         user_id: 1,
//         lat: 1235,
//         lon: 5678,
//         address: '123 4th St.',
//       };
//
//       const { id } = await db('saves')
//         .where('lat', 1234)
//         .first();
//
//       await supertest(server)
//         .put(`/saves/${id}`)
//         .send(modified)
//         .set('Authorization', token)
//         .set('Accept', 'application/json')
//         .expect('Content-Type', /json/)
//         .expect(201);
//     });
//
//     it('returns the modified object', async () => {
//       const save = {
//         user_id: 1,
//         lat: 1234,
//         lon: 5678,
//         address: '123 4th St.',
//       };
//
//       const modified = {
//         user_id: 1,
//         lat: 1235,
//         lon: 5678,
//         address: '123 4th St.',
//       };
//
//       await db('saves').insert(save);
//
//       const { id } = await db('saves')
//         .where('lat', 1234)
//         .first();
//
//       await supertest(server)
//         .put(`/saves/${id}`)
//         .send(modified)
//         .set('Authorization', token)
//         .set('Accept', 'application/json')
//         .expect('Content-Type', /json/)
//         .then((res) => (result = res.body));
//       expect(typeof result).toBe('object');
//       expect(result.lat).toEqual(1235);
//     });
//   });
//   describe('DELETE /:id', () => {
//     it('responds 204', async () => {
//       const save = {
//         user_id: 1,
//         lat: 1234,
//         lon: 5678,
//         address: '123 4th St.',
//       };
//
//       await db('saves').insert(save);
//
//       const { id } = await db('saves')
//         .where('lat', 1234)
//         .first();
//
//       await supertest(server)
//         .delete(`/saves/${id}`)
//         .set('Authorization', token)
//         .expect(204);
//     });
//   });
// });
