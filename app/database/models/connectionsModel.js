const db = require('../dbConfig.js');
const Users = require('./usersModel.js');

async function getConnectionsByUserId(id) {
  const connections = await db('connections')
    .where({ connector_id: id })
    .orWhere({ connected_id: id });

  // removes duplicate IDs (e.g. a 'connector' in one row is 'connected' in others)
  const ids = Array.from(new Set(connections.flatMap((c) => [c.connector_id, c.connected_id])));
  const namesAndAvatars = await Users.getNameAndAvatarByIds(ids);


  return connections.map((conn) => {
    const connectedData = namesAndAvatars[conn.connected_id];
    const connectorData = namesAndAvatars[conn.connector_id];

    return {
      ...conn,
      connected_name: connectedData.name,
      connected_avatar: connectedData.avatar,
      connected_role: connectedData.role,
      connector_name: connectorData.name,
      connector_avatar: connectorData.avatar,
      connector_role: connectorData.role,
    };
  });
}

// use this to "unfriend" OR to cancel a connection request
function deleteConnection(id) {
  return db('connections')
    .where({ id })
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
    .then((res) => {
      const [id] = res;
      return getConnectionById(id);
    });
}

function respondToConnectionRequest(id, status) {
  return db('connections')
    .where({ id })
    .update({ status });
}

async function alreadyExists(connection) {
  const conn = await db('connections')
    .where({
      connected_id: connection.connected_id,
      connector_id: connection.connector_id,
    })
    .orWhere({
      connected_id: connection.connector_id,
      connector_id: connection.connected_id,
    });
  return conn.length > 0;
}

module.exports = {
  getConnectionsByUserId,
  deleteConnection,
  getConnectionById,
  addConnection,
  respondToConnectionRequest,
  alreadyExists,
};
