const Users = require('../database/models/usersModel');
const log = require('../logger');

// This middleware will check a secured endpoint to see
// if the user making the request has been deactivated.
// If so their request will be rejected, and the frontend
// given a 'logout: true' property that will signal
// an automatic logout

const restrictDeactivated = async (req, res, next) => {
  const usr = await Users.findBySub(req.user.sub);

  if (usr.is_deactivated) {
    log.warn(`Rejecting request from deactivated user ${usr.id}`);
    return res.status(401).json({ msg: 'Your account has been deactivated. If you believe this is a mistake, please contact support via our website', logout: true });
  }

  next();
};

module.exports = restrictDeactivated;
