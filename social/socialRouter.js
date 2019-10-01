const express = require('express');
const router = express.Router();

const Social = require('./socialModel');

router.post('/likes/:id', async (req, res) => {
  try {
    const data = await Social.insert(req.body);
    if (data) {
      res.status(201).json({ data, msg: 'Like added to database' });
    } else {
      res
        .status(404)
        .json({ msg: 'The like object was not properly formatted' });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ err, msg: 'Unable to add like' });
  }
});

router.delete('/likes/:id/:user', async (req, res) => {
  try {
    const data = await Social.remove(req.params.id, req.params.user);
    if (data) {
      res.status(200).json({ data, msg: 'Like removed from the database' });
    } else {
      res
        .status(404)
        .json({ msg: 'That like object does not exist in the database' });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ err, msg: 'Unable to remove like' });
  }
});

module.exports = router;
