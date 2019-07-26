const express = require('express');
const router = express.Router();

const Users = require('./usersModel');

router.get('/', async (req, res) => {
  try {
    const users = await Users.find();

    if (users) {
      res.status(200).json({ users, msg: 'The users were found' });
    } else {
      res
        .status(404)
        .json({ msg: 'Users were not found in the database' });
    }
  } catch (err) {
    console.log(err)
    res.status(500).json({ err, msg: 'Unable to make request to server' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const user = await Users.findById(req.params.id);

    if (user) {
      res.status(200).json({ user, msg: 'The user was found' });
    } else {
      res.status(404).json({ msg: 'User not found in the database' });
    }
  } catch (err) {
    res.status(500).json({ err, msg: 'Unable to make request to server' });
  }
});

router.post('/', async (req, res) => {
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

router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const newUser = req.body;
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

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const user = await Users.remove(id);

    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ msg: 'Unable to find user ID' });
    }
  } catch (err) {
    res
      .status(500)
      .json({ err, msg: 'Unable to delete user from database' });
  }
});

module.exports = router;
