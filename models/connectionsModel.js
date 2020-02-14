const db = require('../database/dbConfig.js');

function getConnections() {
  return db('connections');
}

function getConnectionsByUserId(id) {
  return db('connections').where({ connector_id: id });
}

// use this to "unfriend" OR to cancel a connection request
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

// use this for adding a connection or sending a connection request
function addConnection(data) {
  return db('connections')
    .insert(data)
    .returning('connection_id')
    .then(res => {
      const [id] = res;
      return getConnectionById(id);
    });
}

// async function addConnection(data) {
//   const [id] = await db('connections').insert(data).returning
//   return getConnectionById(id);
// }

const getPendingConnectionsByConnectorId = async id => {
  return db('connections').where({ connector_id: id, status: 'pending' });
};

const getPendingConnectionsByConnectedId = async id => {
  return db('connections').where({ connected_id: id, status: 'pending' });
};

function respondToConnectionRequest(connectionId, status) {
  return db('connections')
    .where({ connection_id: connectionId })
    .update({ status: status });
}

module.exports = {
  getConnections,
  getConnectionsByUserId,
  deleteConnection,
  getConnectionById,
  addConnection,
  getPendingConnectionsByConnectorId,
  getPendingConnectionsByConnectedId,
  respondToConnectionRequest
};
