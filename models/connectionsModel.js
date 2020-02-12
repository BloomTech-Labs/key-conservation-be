const db = require('../database/dbConfig.js');

function getConnections() {
  return db('connections');
}

function getConnectionsByUserId(id) {
  return db('connections').where({ connector_id: id });
}

function deleteConnection(id) {
  return db('connections')
    .where({ connection_id: id })
    .del();
}

function getConnectionById(id) {
  return db('connections')
    .where({ id })
    .first();
}

async function addConnection(connectionIds) {
  const [id] = await db('connections').insert(connectionIds, 'connection_id');
  return getConnectionById(id);
}

module.exports = {
  getConnections,
  getConnectionsByUserId,
  deleteConnection,
  addConnection,
  getConnectionById
};
