const supertest = require('supertest');
const server = require('../index');
const db = require('../database/dbConfig');
const Connections = require('../models/connectionsModel');

describe('connections', () => {
  it('retrieves an array of all users comments', async () => {
    const getConnections = await Connections.getConnectionsByUserId()
  }),

  it('adds a connection', async () => {

  }),

  it('deletes a connection', async () => {

  }),

  it('prevents an existing connection from being added again', async () => {

  }),

})
