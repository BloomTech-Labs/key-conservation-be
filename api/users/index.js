const express = require('express');
const log = require('../../logger');

const router = express.Router();

const Users = require('../../models/usersModel');

const mw = require('../../middleware/s3Upload');
const restricted = require('../../middleware/authJwt.js');

router.get('/', restricted, async (req, res) => {
  try {
    const users = await Users.find();

    if (users) {
      res.status(200).json({ users, msg: 'The users were found' });
    } else {
      res
        .status(400)
        .json({ msg: 'Users were not found in the database' });
    }
  } catch (err) {
    log.error(err);
    res.status(500).json({ err, msg: 'Unable to make request to server' });
  }
});

router.get('/:id', restricted, (req, res) => {
  const { id } = req.params;

  Users.findUser(id)
    .then((userId) => {
      log.info(userId);
      if (userId) {
        Users.findById(id)
          .then((user) => res.status(200).json({ user, msg: 'The user was found' }))
          .catch((err) => res.status(500).json({ msg: 'Unable to make request to server' }));
      } else {
        res.status(400).json({ msg: 'User not found in the database' });
      }
    });
});

router.get('/sub/:sub', restricted, async (req, res) => {
  try {
    const user = await Users.findBySub(req.params.sub);

    if (user) {
      res.status(200).json({ user, msg: 'The user was found' });
    } else {
      res.status(404).json({ msg: 'User not found in the database' });
    }
  } catch (err) {
    res.status(500).json({ err, msg: 'Unable to make request to server' });
  }
});

// // This route is specifically for the loading page - DO NOT USE ANYWHERE ELSE
// Checks to see if a user has a sub and/or row in the DB to determine further navigation.
// DO NOT CHANGE MODEL TO RETURN ADDITIONAL DATA - This route is unprotected.
router.get('/subcheck/:sub', async (request, response) => {
  const subID = request.params.sub;

  Users.findUserStatus(subID)
    .then((check) => {
      log.info(check, 'This is yes/no from server about if user is on DB');
      response.status(200).json({ check, message: 'Verification check for users on the DB' });
    })
    .catch((error) => {
      log.error(error);
      response.status(500).json({ error, message: 'Could not communicate with server to check for Users.' });
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
      profile_image: location,
    };
  }

  try {
    const editUser = await Users.update(newUser, id);

    if (editUser) {
      res
        .status(200)
        .json({ msg: 'Successfully updated user', editUser });
    } else {
      res.status(404).json({ msg: 'The user would not be updated' });
    }
  } catch (err) {
    res
      .status(500)
      .json({ err, msg: 'Unable to update user on the database' });
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
