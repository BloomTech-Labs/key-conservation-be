/* eslint-disable arrow-parens */
/* eslint-disable no-console */
const db = require('../dbConfig.js');
const Users = require('./usersModel.js');

function getConnections() {
  return db('connections');
}

async function getConnectionsByUserId(id) {
  const conns = await db('connections')
    .where({ connector_id: id })
    .orWhere({ connected_id: id });

  const ids = [];

  // eslint-disable-next-line no-restricted-syntax
  for (const conn of conns) {
    if (!ids.includes(conn.connector_id)) {
      ids.push(conn.connector_id);
    }
    if (!ids.includes(conn.connected_id)) {
      ids.push(conn.connected_id);
    }
  }
  // TODO possible fix
  // const ids = Array.from(new Set(conns.flatMap((c) => [c.connector_id, c.connected_id])));
  const namesAndAvatars = await Users.getNameAndAvatarByIds(ids);

  return conns.map(conn => {
    const connectedData = namesAndAvatars.find(d => d.id === conn.connected_id);
    const connectorData = namesAndAvatars.find(d => d.id === conn.connector_id);

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
    .returning('id')
    .then(res => {
      const [id] = res;
      return getConnectionById(id);
    });
}

function respondToConnectionRequest(id, status) {
  return db('connections')
    .where({ id })
    .update({ status });
}

function alreadyExists(connection) {
  return db('connections')
    .where({
      connected_id: connection.connected_id,
      connector_id: connection.connector_id,
    })
    .orWhere({
      connected_id: connection.connector_id,
      connector_id: connection.connected_id,
    })
    .then(res => {
      if (res.length) {
        return true;
      } return false;
    });
}

module.exports = {
  getConnections,
  getConnectionsByUserId,
  deleteConnection,
  getConnectionById,
  addConnection,
  respondToConnectionRequest,
  alreadyExists,
};
