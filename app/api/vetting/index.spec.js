const server = require('../../../app');
const request = require('supertest');
const db = require('../../database/dbConfig');

// beforeEach(() => db.seed.run());

describe('vetting', () => {
  it('adds a user to the vetting table', async () => {
    const res = await request(server).post('/api/vetting').send({
      id: 200,
      sub: '12sss3d456',
      email: 's3@rasha.com',
      roles: 'conservationist',
    });
    expect(res.status).toBe(201);
  });
  // it('gets all users from the vetting table', async () => {
  //   const res = await request(server).get('/api/vetting');
  //   expect(res.status).toBe(200);
  // });
  // it('deletes user by id from the vetting table', async () => {
  //   const res = await request(server).delete('/api/vetting/6');
  //   expect(res.status).toBe(200);
  // });
  // it('gets user by id from the vetting table', async () => {
  //   const res = await request(server).get('/api/vetting/6');
  //   expect(res.status).toBe(200);
  // });
  it('approves user in vetting table', async () => {
    const res = await request(server).put('/api/vetting/200');
    expect(res.status).toBe(201);
  });
});
