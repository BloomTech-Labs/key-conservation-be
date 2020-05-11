const express = require('express');
const log = require('../../logger');

const router = express.Router();

const Social = require('../../database/models/socialModel');
const Users = require('../../database/models/usersModel');

router.post('/bookmark/:id', async (req, res) => {
  try {
    const usr = await Users.findBySub(req.user.sub);

    const bookmark = {
      user_id: usr.id,
      campaign_id: req.params.id,
    };

    const data = await Social.insertBookmark(bookmark);
    if (data) {
      res.status(201).json({ data, msg: 'Bookmark added to database' });
    } else {
      res.status(404).json({ msg: 'The bookmark object was not properly formatted' });
    }
  } catch (err) {
    log.error(err);
    res.status(500).json({ err, msg: 'Unable to add bookmark' });
  }
});

router.delete('/bookmark/:id', async (req, res) => {
  try {
    const usr = await Users.findBySub(req.user.sub);
    const data = await Social.removeBookmark(req.params.id, usr.id);
    if (data) {
      res.status(200).json({ data, msg: 'Bookmark removed from the database' });
    } else {
      res.status(404).json({ msg: 'That bookmark object does not exist in the database' });
    }
  } catch (err) {
    log.error(err);
    res.status(500).json({ err, msg: 'Unable to remove bookmark' });
  }
});

router.get('/bookmark', async (req, res) => {
  try {
    const usr = await Users.findBySub(req.user.sub);
    const bookmarks = await Social.findUserBookmarks(usr.id);
    res.status(200).json(bookmarks);
  } catch (err) {
    log.error('There was an error', err);
    res.status(500).json({ err, msg: 'Unable to fetch bookmarks' });
  }
});

module.exports = router;
