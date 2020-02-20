const db = require('../database/dbConfig.js');
const Users = require('./UsersModel.js');

function getConnections() {
  return db('connections');
}

function getConnectionsByUserId(id) {
  return db('connections')
    .where({ connector_id: id })
    .orWhere({ connected_id: id });
}

// use this to "unfriend" OR to cancel a connection request
function deleteConnection(id) {
  return db('connections')
    .where({ connection_id: id })
    .del();
}

// async function getConnectionById(id) {
//   const conn = await db('connections')
//     .where({ connection_id: id })
//     .first();
//   const user = await Users.getNameAndAvatarById(conn.connector_id);
//   const connection = { ...conn, ...user };
//   return connection;
// }

async function getConnectionById(id) {
  const conn = await db('connections')
    .where({ connection_id: id })
    .first();
  return conn;
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

function respondToConnectionRequest(connectionId, status) {
  return db('connections')
    .where({ connection_id: connectionId })
    .update({ status });
}

module.exports = {
  getConnections,
  getConnectionsByUserId,
  deleteConnection,
  getConnectionById,
  addConnection,
  respondToConnectionRequest
};
