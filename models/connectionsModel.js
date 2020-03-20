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

  const ids = [];

  for (const conn of conns) {
    if (!ids.includes(conn.connector_id)) {
      ids.push(conn.connector_id);
    }
    if (!ids.includes(conn.connected_id)) {
      ids.push(conn.connected_id);
    }
  }

  const namesAndAvatars = await Users.getNameAndAvatarByIds(ids);

  return conns.map(conn => {
    const connected_data = namesAndAvatars.find(d => d.id === conn.connected_id);
    const connector_data = namesAndAvatars.find(d => d.id === conn.connector_id);

    console.log(connected_data);
    console.log(connector_data);

    return {
      ...conn,
      connected_name: connected_data.name,
      connected_avatar: connected_data.avatar,
      connected_role: connected_data.role,
      connector_name: connector_data.name,
      connector_avatar: connector_data.avatar,
      connector_role: connector_data.role,
    };
  });
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
