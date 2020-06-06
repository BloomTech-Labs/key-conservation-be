const express = require('express');
const router = express.Router();
const log = require('../../logger');
const S3Upload = require('../../middleware/s3Upload');

const Vetting = require('../../database/models/vettingModel');

router.get('/', async (req, res) => {
  const allUsers = await Vetting.findAll();
  try {
    if (allUsers) {
      return res.status(200).json(allUsers);
    } else {
      return res.status(404).json({ message: 'No users in vetting database' });
    }
  } catch (error) {
    log.error(error);
    return res.status(500).json({ message: error.message, error });
  }
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const user = await Vetting.findVettingUserBySub(id);
    if (user) {
      return res.status(200).json({ user, message: 'The user was found' });
    } else {
      return res
        .status(404)
        .json({ message: 'User not found in the database' });
    }
  } catch (error) {
    log.error(error);
    return res.status(500).json({ message: error.message, error });
  }
});

router.post('/', S3Upload.upload.single('photo'), async (req, res) => {
  let user = {
    ...req.body,
    profile_image: req.file
      ? req.file.location
      : 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png',
  };
  const newUser = await Vetting.addVettingUser(user);
  try {
    if (newUser) {
      return res.status(201).json({
        newUser,
        message: 'The user was successfully added to vetting database',
      });
    } else {
      return res.status(404).json({ message: 'nope' });
    }
  } catch (error) {
    log.error(error);
    return res.status(500).json({ message: error.message, error });
  }
});

router.delete('/:sub', async (req, res) => {
  const { sub } = req.params;
  try {
    const deleted = await Vetting.deleteUser(sub);
    if (deleted === sub) {
      res.status(200).json({
        msg: `User has been deleted from vetting table.`,
      });
    } else {
      res
        .status(404)
        .json({ msg: 'Unable to find user with that id in vetting table.' });
    }
  } catch (error) {
    log.error(error);
    return res.status(500).json({ message: error.message, error });
  }
});

router.put('/:sub', async (req, res) => {
  const sub = req.params.sub;
  try {
    const approvedUser = await Vetting.approveUser(sub);
    if (approvedUser) {
      return res.status(201).json({
        approvedUser,
        message: 'The user was moved successfully to the users table',
      });
    } else {
      return res.status(404);
    }
  } catch (error) {
    log.error(error);
    return res.status(500).json({ message: error.message, error });
  }
});

module.exports = router;
