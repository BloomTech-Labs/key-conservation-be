const express = require('express');
const router = express.Router();
const log = require('../../logger');

const Vetting = require('../../database/models/vettingModel');

router.get('/', async (req, res) => {
  const allUsers = Vetting.findAll();
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
    const user = Vetting.findVettingUserById(id);
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

router.post('/', async (req, res) => {
  const user = req.body;
  try {
    const newUser = Vetting.addVettingUser(user);
    if (user) {
      return res
        .status(200)
        .json({ user, message: 'The user was successfully added' });
    }
  } catch (error) {
    log.error(error);
    return res.status(500).json({ message: error.message, error });
  }
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const deleted = await Vetting.deleteUser(id);
    if (deleted === id) {
      res.status(200).json({
        msg: `User with id ${id} has been deleted from vetting table.`,
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

router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const user = Vetting.findVettingUserById(id);
  try {
    const approvedUser = Vetting.approveUser(user);
    if (approvedUser) {
      return res.status(201).json({
        approvedUser,
        message: 'The user was moved successfully to the users table',
      });
    }
  } catch (error) {
    log.error(error);
    return res.status(500).json({ message: error.message, error });
  }
});

module.exports = router;
