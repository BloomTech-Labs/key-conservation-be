const express = require('express');
const log = require('../../logger');

const router = express.Router();

const Users = require('../../database/models/usersModel');
const Campaigns = require('../../database/models/campaignModel');
const CampaignPosts = require('../../database/models/campaignPostsModel');
const Emojis = require('../../database/models/emojiModel');
const ApplicationSubmissions = require('../../database/models/applicationSubmissionsModel');
const SkilledImpactRequests = require('../../database/models/skilledImpactRequestsModel');
const S3Upload = require('../../middleware/s3Upload');
const SkillsEnum = require('../../database/models/skillsEnum');
const pick = require('../../../util/pick');

const { sendWSMessage } = require('../../websockets');

router.get('/', async (req, res) => {
  let { skill } = req.query;

  // verify skill if passed in
  if (skill) {
    skill = skill.toUpperCase().replace(' ', '_');
    if (!Object.keys(SkillsEnum).includes(skill)) {
      res.status(400).json({ message: 'Invalid skill entered' });
    }
  }

  const filters = { skill };

  try {
    const campaigns = await Campaigns.findAll(filters);
    res.status(200).json({ campaigns, msg: 'The campaigns were found' });
  } catch (err) {
    log.error(err);
    res.status(500).json({ err, msg: 'Unable to make request to server' });
  }
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const campaign = await Campaigns.findById(id);
    if (!campaign) {
      return res
        .status(400)
        .json({ msg: 'Campaign was not found in the database' });
    }
    if (campaign.is_deactivated) {
      const user = await Users.findBySub(req.user.sub);
      if (!user || !user.admin) {
        return res.status(401).json({
          msg: 'This campaign may only be viewed by an administrator',
        });
      }
    }
    return res.status(200).json({ campaign, msg: 'The campaign was found' });
  } catch (err) {
    log.error(err);
    res.status(500).json({ err, msg: 'Unable to make request to server' });
  }
});

router.get('/:id/submissions', async (req, res) => {
  const { id } = req.params;
  try {
    const applicationSubmissions = await ApplicationSubmissions.findAllByCampaignId(
      id,
    );
    res.status(200).json({ applicationSubmissions, error: null });
  } catch (error) {
    res
      .status(500)
      .json({ error, message: 'Unable to make request to server' });
  }
});

router.post('/', S3Upload.upload.single('photo'), async (req, res) => {
  const { location: image } = req.file;
  const { skilledImpactRequests } = req.body;
  const {
    // eslint-disable-next-line camelcase
    user_id,
    name,
    call_to_action,
    urgency,
    description,
  } = req.body;

  const postCampaign = {
    user_id,
    name,
    call_to_action,
    urgency,
  };

  try {
    const campaignId = await Campaigns.insert(postCampaign);
    if (campaignId) {
      await CampaignPosts.insert({
        campaign_id: campaignId,
        image,
        description,
        is_update: false,
      });
      if (skilledImpactRequests) await SkilledImpactRequests.insert(skilledImpactRequests, campaignId);
      const newCampaigns = await Campaigns.findById(campaignId);
      log.info(`inserted campaign ${name}`, newCampaigns);

      // Send over WebSockets
      sendWSMessage({
        feed: newCampaigns,
      });

      res.status(201).json({ newCampaigns, msg: 'Campaign added to database' });
      // eslint-disable-next-line camelcase
    } else if (!image || !name || !description || !call_to_action) {
      log.info('no data');
      res.status(404).json({
        msg: 'You need campaign image, campaign name, and campaign description',
      });
    }
  } catch (err) {
    log.error(err.message);
    res.status(500).json({ err, msg: 'Unable to add campaign' });
  }
});

router.post(
  '/update/:id',
  S3Upload.upload.single('photo'),
  async (req, res) => {
    const newCampaignUpdate = pick(req.body, ['description']);

    newCampaignUpdate.campaign_id = req.params.id;

    newCampaignUpdate.is_update = true;
    if (req.file) {
      newCampaignUpdate.image = req.file.location;
    }

    try {
      const campaignUpdate = await CampaignPosts.insert(newCampaignUpdate);
      if (campaignUpdate) {
        log.info(campaignUpdate);
        res
          .status(201)
          .json({ campaignUpdate, msg: 'Campaign update added to database' });
      }
    } catch (err) {
      log.error(err.message);
      res.status(500).json({ err, msg: 'Unable to add update' });
    }
  },
);

// Get reactions on a campaign post
router.get('/:id/reactions', async (req, res) => {
  const { id } = req.params;

  const { sub } = req.user;

  try {
    const { id: userId } = await Users.findBySub(sub);

    const reactions = await Emojis.findByCampaignPost(id);
    const [userReaction] = await Emojis.findUserReactionByCampaignPost(
      id,
      userId,
    );

    return res.status(200).json({
      reactions,
      userReaction,
    });
  } catch (err) {
    log.error(JSON.stringify(err.message));
    return res.status(500).json({
      message: `An internal server occurred while fetching reactions for campaign post ID ${id}`,
    });
  }
});

router.put('/:id/reactions', async (req, res) => {
  const { id } = req.params;

  const { sub } = req.user;

  try {
    const { emoji } = req.body;

    const { id: userId } = await Users.findBySub(sub);

    if (!emoji) {
      await Emojis.removeUserReactionFromPost(id, userId);
    } else if (emoji && emoji.trim() && emoji.trim().length <= 3) {
      await Emojis.addUserReactionToPost(id, userId, emoji);
    } else {
      return res
        .status(400)
        .json({ message: 'Invalid Emoji - Input too large' });
    }

    return res.sendStatus(200);
  } catch (err) {
    log.error(JSON.stringify(err.message));
    return res.status(500).json({
      message: `An internal server error occurred while updating user reaction on post ID ${id}`,
    });
  }
});

module.exports = router;
