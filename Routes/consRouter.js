const express = require('express');
const router = express.Router();

const Cons = require('../Models/consModel');

router.get('/', async (req, res) => {
  try {
    const cons = await Cons.find();

    if (cons.length) {
      res.status(200).json({ cons, msg: 'The conservation was found' });
    } else {
      res.status(404).json({ msg: 'Conservation not found' });
    }
  } catch (err) {
    res.status(500).json({ msg: 'error processing' });
  }
});

module.exports = router;
