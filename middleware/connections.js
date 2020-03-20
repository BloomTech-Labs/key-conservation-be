// checks if a user is already connected to another to prevent multiple connections between the same users
const Connections = require('../models/connectionsModel');

// checks to see if users are already connected
const checkConnection = async (req, res, next) => {
  const { id } = req.params;
  const allConnections = await Connections.getConnectionsByUserId(id);
  const found = allConnections.find(
    (connection) => connection.connected_id === req.body.connected_id,
  );

  if (found) {
    return res.status(403).send({ message: 'Users are already connected' });
  }

  next();
};

// prevents addConnection request to be made where connector and connected have same user id
const checkUniqueIds = async (req, res, next) => {
  if (parseInt(req.params.id) === req.body.connected_id) {
    res.status(403).send({ message: 'A user cannot connect to themselves' });
  } else next();
};

module.exports = {
  checkConnection,
  checkUniqueIds,
};
