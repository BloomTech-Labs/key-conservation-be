const express = require('express');
const CampaignPosts = require('../../database/models/campaignPostsModel');
const SkillsEnum = require('../../database/models/skillsEnum');

const router = express.Router();

router.get('/', async (req, res) => {
  // size: Size of data to send back
  // startAt: Which post to start sending data from,
  // 0 being newest post
  const { size, startAt, date } = req.query;

  let { skill } = req.query;

  // verify skill if passed in
  if (skill) {
    skill = skill.toUpperCase().replace(' ', '_');
    if (!Object.keys(SkillsEnum).includes(skill)) {
      res.status(400).json({ message: 'Invalid skill entered' });
    }
  }

  try {
    const feed = await CampaignPosts.getMostRecentPosts(
      startAt,
      size,
      date,
      skill,
    );
    return res.status(200).json(feed);
  } catch (err) {
    return res.status(500).json({
      err: err.message,
      message: 'An error occurred while retrieving the feed.',
    });
  }
});

module.exports = router;
