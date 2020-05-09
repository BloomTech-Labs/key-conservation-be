const express = require('express');
const CampaignPosts = require('../../database/models/campaignPostsModel');

const router = express.Router();

router.get('/', async (req, res) => {
  // size: Size of data to send back
  // startAt: Which post to start sending data from,
  // 0 being newest post
  const { size, startAt } = req.query;

  try {
    const feed = await CampaignPosts.getMostRecentPosts(startAt, size);
    return res.status(200).json(feed);
  } catch (err) {
    return res.status(500).json({
      err: err.message,
      message: 'An error occurred while retrieving the feed.',
    });
  }
});

module.exports = router;
