const express = require('express');
const router = express.Router();

const Social = require('./socialModel');

router.get('/likes/:id', async (req, res) => {
  try {
    const data = await Social.findCampaignLikes(req.params.id);
    if (data) {
      res.status(200).json({ data, msg: 'Retrieved likes' });
    } else {
      res
        .status(404)
        .json({ msg: 'No object with that id exists in the database' });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ err, msg: 'Unable to retrieve likes' });
  }
});

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

router.post('/update/:id', async (req, res) => {
  try {
    const data = await Social.updateInsert(req.body);
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

router.delete('/update/:id/:user', async (req, res) => {
  try {
    const data = await Social.updateRemove(req.params.id, req.params.user);
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

router.post('/bookmark/:id', async (req, res) => {
  try {
    const data = await Social.insertBookmark(req.body);
    if (data) {
      res.status(201).json({ data, msg: 'Bookmark added to database' });
    } else {
      res
        .status(404)
        .json({ msg: 'The bookmark object was not properly formatted' });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ err, msg: 'Unable to add bookmark' });
  }
});

router.delete('/bookmark/:id/:user', async (req, res) => {
  try {
    const data = await Social.removeBookmark(req.params.id, req.params.user);
    if (data) {
      res.status(200).json({ data, msg: 'Bookmark removed from the database' });
    } else {
      res
        .status(404)
        .json({ msg: 'That bookmark object does not exist in the database' });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ err, msg: 'Unable to remove bookmark' });
  }
});

module.exports = router;
