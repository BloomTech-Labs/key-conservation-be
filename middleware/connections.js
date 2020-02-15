// checks if a user is already connected to another to prevent multiple connections between the same users
const Connections = require('../models/connectionsModel');

const checkConnection = async (req, res, next) => {
  const { id } = req.params;
  const allConnections = await Connections.getConnectionsByUserId(id);
  let found = allConnections.find(
    connection => connection.connected_id === req.body.connected_id
  );

  console.log('found', found);

  if (found) {
    return res.status(403).json({ msg: 'Users are already connected' });
  }

  next();
};

// prevents addConnection request to be made where connector and connected have same user id
const checkUniqueIds = async (req, res, next) => {
  const { connectorId } = req.params;
  const { connectedId } = req.body.connectedId;

  if (connectorId === connectedId) {
    res.status(403).json({ msg: 'A user cannot connect to themselves' });
  }
  next();
};

module.exports = {
  checkConnection,
  checkUniqueIds
};
