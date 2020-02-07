const express = require('express');
const log = require('../../logger');

const router = express.Router();

const Users = require('../../models/usersModel');
const Reports = require('../../models/reportModel');

const mw = require('../../middleware/s3Upload');
const restricted = require('../../middleware/authJwt.js');

router.get('/', restricted, async (req, res) => {
  try {
    let users = await Users.find();

    if (users) {
      const reqUsr = Users.findBySub(req.user.sub);

      if (!reqUsr.admin) users = users.filter(usr => !usr.is_deactivated);

      res.status(200).json({ users, msg: 'The users were found' });
    } else {
      res.status(400).json({ msg: 'Users were not found in the database' });
    }
  } catch (err) {
    log.error(err);
    res.status(500).json({ err, msg: 'Unable to make request to server' });
  }
});

router.get('/:id', restricted, async (req, res) => {
  const { id } = req.params;

  try {
    const user = await Users.findById(id);

    if (!user) {
      return res.status(404).json({ msg: 'User not found in the database' });
    }

    if (user.is_deactivated) {
      const reqUsr = await Users.findBySub(req.user.sub);
      if (!reqUsr.admin) {
        return res
          .status(401)
          .json({ msg: 'This account has been deactivated' });
      }
    }

    return res.status(200).json({ user, msg: 'The user was found' });
  } catch (err) {
    return res.status(500).json({ msg: err.message, err });
  }
});

router.get('/sub/:sub', restricted, async (req, res) => {
  try {
    const user = await Users.findBySub(req.params.sub);

    const reqUsr = await Users.findBySub(req.user.sub);

    if (user) {
      if (user.is_deactivated && !reqUsr.admin)
        return res
          .status(401)
          .json({ msg: 'This account has been deactivated' });
      return res.status(200).json({ user, msg: 'The user was found' });
    } else {
      return res.status(404).json({ msg: 'User not found in the database' });
    }
  } catch (err) {
    return res
      .status(500)
      .json({ err, msg: 'Unable to make request to server' });
  }
});

// // This route is specifically for the loading page - DO NOT USE ANYWHERE ELSE
// Checks to see if a user has a sub and/or row in the DB to determine further navigation.
// DO NOT CHANGE MODEL TO RETURN ADDITIONAL DATA - This route is unprotected.
router.get('/subcheck/:sub', async (request, response) => {
  const subID = request.params.sub;

  Users.findUserStatus(subID)
    .then(check => {
      log.info(check, 'This is yes/no from server about if user is on DB');
      // console.log(check);
      if (check.deactivated) {
        return response
          .status(401)
          .json({
            msg: `Your account has been deactivated. If you believe this is a mistake, please contact support via our website`,
            logout: true
          });
      } else return response
          .status(200)
          .json({ check, message: 'Verification check for users on the DB' });
    })
    .catch(error => {
      log.error(error);
      response.status(500).json({
        error,
        message: 'Could not communicate with server to check for Users.'
      });
    });
});

router.post('/', restricted, async (req, res) => {
  const user = req.body;

  try {
    const newUser = await Users.insert(user);

    if (newUser) {
      res.status(201).json({ newUser, msg: 'User added to database' });
    }
  } catch (err) {
    res.status(500).json({ err, msg: 'Unable to add user' });
  }
});

router.put('/:id', restricted, mw.upload.single('photo'), async (req, res) => {
  const { id } = req.params;
  let location;
  let newUser = req.body;
  if (req.file) {
    location = req.file.location;
    newUser = {
      ...req.body,
      profile_image: location
    };
  }

  try {
    const reqUsr = await Users.findBySub(req.user.sub);

    if (reqUsr.id !== id && !reqUsr.admin) {
      return res.status(401).json({ msg: 'You may not modify this profile!' });
    }

    const editUser = await Users.update(newUser, id);

    if (editUser) {
      res.status(200).json({ msg: 'Successfully updated user', editUser });
    } else {
      res.status(404).json({ msg: 'The user would not be updated' });
    }
  } catch (err) {
    res.status(500).json({ err, msg: 'Unable to update user on the database' });
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

    // Update target user data to reflect deactivation
    const updates = {
      is_deactivated: true,
      strikes: targetUser.strikes + 1
    };

    console.log(updates);

    await Users.update(updates, req.params.id);

    // Archive all reports relating to this user
    await Reports.updateWhere({reported_user: req.params.id}, { is_archived: true });

    // Respond with 200 OK
    return res.sendStatus(200);
  } catch (err) {
    return res.status(500).json({
      error: err.message,
      message: 'Failed to deactivate user. Please try again'
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
      is_deactivated: false
    };

    await Users.update(updates, req.params.id);

    // Respond with 200 OK
    return res.sendStatus(200);
  } catch (err) {
    return res.status(500).json({
      error: err.message,
      message: 'An internal server error occurred'
    });
  }
});

// router.delete('/:id', restricted, async (req, res) => {
//   const { id } = req.params;
//   try {
//     const user = await Users.remove(id);

//     if (user) {
//       res.status(200).json(user);
//     } else {
//       res.status(404).json({ msg: 'Unable to find user ID' });
//     }
//   } catch (err) {
//     res
//       .status(500)
//       .json({ err, msg: 'Unable to delete user from database' });
//   }
// });

module.exports = router;
