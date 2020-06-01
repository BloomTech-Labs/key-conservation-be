const server = require('../../../app');
const request = require('supertest');

describe('vetting', () => {
  it('get /', async () => {
    const res = await request(server).get('/vetting');
    expect(res.status).toBe(200);
  });
});
