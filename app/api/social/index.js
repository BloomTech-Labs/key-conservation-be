const express = require('express');
const log = require('../../logger');

const router = express.Router();

const Social = require('../../database/models/socialModel');
const Campaigns = require('../../database/models/campaignModel');

router.post('/bookmark/:id', async (req, res) => {
  try {
    const data = await Social.insertBookmark(req.body);
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

router.delete('/bookmark/:id/:user', async (req, res) => {
  try {
    const data = await Social.removeBookmark(req.params.id, req.params.user);
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

router.get('/bookmark/:user', async (req, res) => {
  try {
    const bookmarks = await Social.findUserBookmarks(req.params.user);
    const savedCampaigns = await Promise.all(bookmarks.map((b) => Campaigns.findCampaign(b.campaign_id)));
    res.status(200).json(savedCampaigns);
  } catch (err) {
    log.error(err);
    res.status(500).json({ err, msg: 'Unable to fetch bookmarks' });
  }
});

module.exports = router;
