const express = require('express');
const router = express.Router();

const Social = require('./socialModel');

router.post('/likes/:id', async (req, res) => {
  try {
    const data = await Social.insert(req.body);
    if (data) {
      res.status(201).json({ data, msg: 'Comment added to database' });
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

module.exports = router;
