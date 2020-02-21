/* eslint-disable arrow-parens */
/* eslint-disable no-console */
const db = require('../database/dbConfig.js');
const Users = require('./usersModel.js');

function getConnections() {
  return db('connections');
}

async function getConnectionsByUserId(id) {
  const conns = await db('connections')
    .where({ connector_id: id })
    .orWhere({ connected_id: id });
  const newArray = [];

  for (const conn of conns) {
    const user = await Users.getNameAndAvatarById(conn.connected_id);
    const connection = { ...conn, ...user };
    newArray.push(connection);
  }
  return newArray;
}

// use this to "unfriend" OR to cancel a connection request
function deleteConnection(id) {
  return db('connections')
    .where({ connection_id: id })
    .del();
}

function getConnectionById(id) {
  return db('connections')
    .where({ connection_id: id })
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
