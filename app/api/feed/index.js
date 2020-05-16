const express = require('express');
const CampaignPosts = require('../../database/models/campaignPostsModel');

const router = express.Router();

router.get('/', async (req, res) => {
  // size: Size of data to send back
  // startAt: Date of post to start sending data from,
  // date to filter by
  // dateOrder: 0 to get newer, 1 to get older.
  const { size, startAt, date } = req.query;

  try {
    const feed = await CampaignPosts.getMostRecentPosts(startAt, size, date);

    console.log(feed);

    return res.status(200).json(feed);
  } catch (err) {
    return res.status(500).json({
      err: err.message,
      message: 'An error occurred while retrieving the feed.',
    });
  }
});

module.exports = router;
