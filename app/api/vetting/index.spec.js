const server = require('../../../app');
const request = require('supertest');
const db = require('../../database/dbConfig');

beforeEach(() => db.seed.run());

describe('vetting', () => {
  it('get /', async () => {
    const res = await request(server).get('/vetting');
    expect(res.body).toEqual({});
  });
});
