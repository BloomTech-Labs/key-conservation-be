const express = require('express');
const log = require('../../logger');

const router = express.Router();

const Users = require('../../models/usersModel');
const Reports = require('../../models/reportModel');
const Connections = require('../../models/connectionsModel');

const S3Upload = require('../../middleware/s3Upload');
const restricted = require('../../middleware/authJwt.js');
const { checkConnection, checkUniqueIds } = require('../../middleware/connections');

router.get('/', restricted, async (req, res) => {
  try {
    let users = await Users.find();

    if (users) {
      const reqUsr = Users.findBySub(req.user.sub);

      if (!reqUsr.admin) users = users.filter((usr) => !usr.is_deactivated);

      res.status(200).json({ users, message: 'The users were found' });
    } else {
      res.status(400).json({ message: 'Users were not found in the database' });
    }
  } catch (err) {
    log.error(err);
    res.status(500).json({ err, message: 'Unable to make request to server' });
  }
});

router.get('/:id', restricted, async (req, res) => {
  const { id } = req.params;

  try {
    const user = await Users.findById(id);
    if (!user) {
      return res.status(404).json({ message: 'User not found in the database' });
    }

    if (user.is_deactivated) {
      const reqUsr = await Users.findBySub(req.user.sub);

      if (!reqUsr.admin) {
        if (reqUsr.id === user.id) {
          return res.status(401).json({
            message:
              'Your account has been deactivated. If you believe this is a mistake, please contact support via our website',
            logout: true,
          });
        }
        return res.status(401).json({ message: 'This account has been deactivated' });
      }
    }

    return res.status(200).json({ user, message: 'The user was found' });
  } catch (err) {
    log.error(err);
    return res.status(500).json({ message: err.message, err });
  }
});

router.get('/sub/:sub', restricted, async (req, res) => {
  try {
    const user = await Users.findBySub(req.params.sub);

    const reqUsr = await Users.findBySub(req.user.sub);

    if (user) {
      if (user.is_deactivated && !reqUsr.admin) {
        if (reqUsr.id === user.id) {
          return res.status(401).json({
            message:
              'Your account has been deactivated. If you believe this is a mistake, please contact support via our website',
            logout: true,
          });
        }
        return res.status(401).json({ message: 'This account has been deactivated' });
      }
      return res.status(200).json({ user, message: 'The user was found' });
    }
    return res.status(404).json({ message: 'User not found in the database' });
  } catch (err) {
    return res.status(500).json({ err, message: 'Unable to make request to server' });
  }
});

// This route is specifically for the loading page - DO NOT USE ANYWHERE ELSE
// Checks to see if a user has a sub and/or row in the DB to determine further navigation.
// DO NOT CHANGE MODEL TO RETURN ADDITIONAL DATA - This route is unprotected.
router.get('/subcheck/:sub', async (request, response) => {
  const subID = request.params.sub;

  Users.findUserStatus(subID)
    .then((check) => {
      log.info(check, 'This is yes/no from server about if user is on DB');
      if (check.deactivated) {
        return response.status(401).json({
          message:
            'Your account has been deactivated. If you believe this is a mistake, please contact support via our website',
          logout: true,
        });
      }
      return response.status(200).json({ check, message: 'Verification check for users on the DB' });
    })
    .catch((error) => {
      log.error(error);
      response.status(500).json({
        error,
        message: 'Could not communicate with server to check for Users.',
      });
    });
});

router.post('/', S3Upload.upload.single('photo'), async (req, res) => {
  const user = {
    ...req.body,
    profile_image: req.file ? req.file.location : undefined,
  };

  try {
    const newUser = await Users.add(user);
    if (newUser) {
      res.status(201).json({ newUser, message: 'User added to database' });
    }
  } catch (err) {
    res.status(500).json({ err, message: 'Unable to add user' });
  }
});

router.put('/:id', restricted, S3Upload.upload.single('photo'), async (req, res) => {
  const { id } = req.params;

  const newUser = {
    ...req.body,
    profile_image: req.file
      ? req.file.location : 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png',
  };

  try {
    const reqUsr = await Users.findBySub(req.user.sub);

    if (Number(reqUsr.id) !== Number(id) && !reqUsr.admin) {
      return res
        .status(401)
        .json({ message: 'You may not modify this profile!' });
    }
    const editUser = await Users.update(newUser, id);

    if (editUser) {
      res.status(200).json({ message: 'Successfully updated user', editUser });
    } else {
      res.status(404).json({ message: 'The user would not be updated' });
    }
  } catch (err) {
    log.error(err);
    res.status(500).json({ err, message: 'Unable to update user on the database' });
  }
});

router.post('/deactivate/:id', restricted, async (req, res) => {
  try {
    // Make sure user making request has admin priveleges
    const { sub } = req.user;

    const user = await Users.findBySub(sub);

    if (!user.admin) {
      throw new Error('Only system administrators may deactivate accounts!');
    }

    const targetUser = await Users.findById(req.params.id);

    const strikes = targetUser.is_deactivated
      ? targetUser.strikes
      : targetUser.strikes + 1;

    // Update target user data to reflect deactivation
    const updates = {
      is_deactivated: true,
      strikes,
    };

    await Users.update(updates, req.params.id);

    // Archive all reports relating to this user
    await Reports.updateWhere(
      { reported_user: req.params.id },
      { is_archived: true },
    );

    // Respond with 200 OK
    return res.sendStatus(200);
  } catch (err) {
    return res.status(500).json({
      error: err.message,
      message: 'Failed to deactivate user. Please try again',
    });
  }
});

router.post('/reactivate/:id', restricted, async (req, res) => {
  try {
    // Make sure user making request has admin priveleges
    const { sub } = req.user;

    const user = await Users.findBySub(sub);

    if (!user.admin) {
      throw new Error('Only system administrators may reactivate accounts!');
    }

    // Update target user data to reflect deactivation
    const updates = {
      is_deactivated: false,
    };

    await Users.update(updates, req.params.id);

    // Respond with 200 OK
    return res.sendStatus(200);
  } catch (err) {
    return res.status(500).json({
      error: err.message,
      message: 'An internal server error occurred',
    });
  }
});

router.post(
  '/connect/:id',
  restricted,
  checkConnection,
  checkUniqueIds,
  async (req, res) => {
    try {
      const usr = await Users.findBySub(req.user.sub);

      if (Number(usr.id) === Number(req.params.id)) {
        return res.status(400).json({ message: 'You may not connect to yourself' });
      }

      const targetUsr = await Users.findById(req.params.id);

      const status = targetUsr.roles === 'supporter' ? 'Pending' : 'Connected';

      if (!req.params.id) {
        res.status(400).json({
          msg: 'You must pass in the connected_id in the request url',
        });
      }

      const connectionData = {
        connector_id: usr.id,
        connected_id: req.params.id,
        status,
      };

      const duplicate = await Connections.alreadyExists(connectionData);

      if (duplicate) {
        return res.status(400).json({ message: 'The users specified are already connected' });
      }

      const newConnection = await Connections.addConnection(connectionData);

      if (newConnection) {
        res.status(201).json({
          newConnection,
          msg: 'New connection was added to the database',
        });
      }
    } catch (err) {
      log.error(err);
      res.status(500).json({ err, msg: 'Unable to add connection to database' });
    }
  });

router.delete('/connect/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const deleted = await Connections.deleteConnection(id);

    if (deleted === 1) {
      res.status(200).json({ msg: `Connection with id ${id} has been deleted` });
    } else {
      res.status(404).json({ msg: 'Unable to find connection with that id' });
    }
  } catch (err) {
    res.status(500).json({ err, msg: 'Unable to remove connection from database' });
  }
});

router.get('/connect/:userId', async (req, res) => {
  try {
    const userConnections = await Connections.getConnectionsByUserId(
      req.params.userId,
    );

    res.status(200).json(userConnections);
  } catch (err) {
    log.error(err);
    res.status(500).json({ msg: 'Error connecting to database' });
  }
});

router.put('/connect/:connectionId', async (req, res) => {
  if (!req.params.connectionId) {
    res.status(401).json({ msg: 'Please include the connectionId in the request URL' });
  }
  if (!req.body) {
    res.status(401).json({
      msg: 'Please include the status (accepted or rejected) in the request body',
    });
  }

  const updated = await Connections.respondToConnectionRequest(
    req.params.connectionId,
    req.body.status,
  );


  try {
    if (updated === 1) {
      const newConnectionStatus = await Connections.getConnectionById(
        req.params.connectionId,
      );
      res.status(201).json({
        msg: `The status of connection with id ${req.params.connectionId} was changed to ${newConnectionStatus.status}`,
      });
    } else {
      res.status(404).json({ msg: 'No connection found with that id' });
    }
  } catch (err) {
    res.status(500).json({ msg: 'Database error' });
  }
});


module.exports = router;
