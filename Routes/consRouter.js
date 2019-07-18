const express = require('express');
const router = express.Router();

const Cons = require('../Models/consModel');

router.get('/', async (req, res) => {
  try {
    const cons = await Cons.find();

    if (cons) {
      res.status(200).json({ cons, msg: 'The conservations were found' });
    } else {
      res
        .status(404)
        .json({ msg: 'Conservations were not found in the database' });
    }
  } catch (err) {
    res.status(500).json({ err, msg: 'Unable to make request to server' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const cons = await Cons.findById(req.params.id);

    if (cons) {
      res.status(200).json({ cons, msg: 'The conservation was found' });
    } else {
      res.status(404).json({ msg: 'Conservation not found in the database' });
    }
  } catch (err) {
    res.status(500).json({ err, msg: 'Unable to make request to server' });
  }
});

router.post('/', async (req, res) => {
  const cons = req.body;

  try {
    if (
      !cons.org_name ||
      !cons.org_link ||
      !cons.about_us ||
      !cons.species ||
      !cons.habitats ||
      !cons.issues
    ) {
      res.status(404).json({ msg: 'You need org link, about us' });
    }
    const newCons = await Cons.insert(cons);
    if (newCons) {
      res.status(201).json({ newCons, msg: 'Conservation added to database' });
    }
  } catch (err) {
    res.status(500).json({ err, msg: 'Unable to add conservation' });
  }
});

router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const newCons = req.body;
  try {
    const editCon = await Cons.update(newCons, id);
    if (editCon) {
      res
        .status(200)
        .json({ msg: 'Successfully updated conservation', editCon });
    } else {
      res.status(404).json({ msg: 'The conservation would not be updated' });
    }
  } catch (err) {
    res
      .status(500)
      .json({ err, msg: 'Unable to update conservation to the server' });
  }
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const cons = await Cons.remove(id);
    if (cons) {
      res.status(200).json(cons);
    } else {
      res.status(404).json({ msg: 'Unable to find conservation ID' });
    }
  } catch (err) {
    res
      .status(500)
      .json({ err, msg: 'Unable to delete conservation from server' });
  }
});

module.exports = router;
