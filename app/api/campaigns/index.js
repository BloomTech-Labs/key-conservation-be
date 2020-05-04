const express = require('express');
const log = require('../../logger');

const router = express.Router();

const Reports = require('../../database/models/reportModel');
const Users = require('../../database/models/usersModel');
const Campaigns = require('../../database/models/campaignModel');
const CampaignPosts = require('../../database/models/campaignPostsModel');
const ApplicationSubmissions = require('../../database/models/applicationSubmissionsModel');
const SkilledImpactRequests = require('../../database/models/skilledImpactRequestsModel');
const S3Upload = require('../../middleware/s3Upload');
const SkillsEnum = require('../../database/models/skillsEnum');
const pick = require('../../../util/pick');

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
    if (!campaign) return res.status(400).json({ msg: 'Campaign was not found in the database' });
    if (campaign.is_deactivated) {
      const user = await Users.findBySub(req.user.sub);
      if (!user || !user.admin) {
        return res.status(401).json({ msg: 'This campaign may only be viewed by an administrator' });
      }
    }
    return res.status(200).json({ campaign, msg: 'The campaign was found' });
  } catch (err) {
    log.error(err);
    res.status(500).json({ err, msg: 'Unable to make request to server' });
  }
});

router.get('/camp/:id', async (req, res) => {
  const { id } = req.params;

  try {
    let user = await Users.findUser(id);
    if (!user) return res.status(404).json({ msg: 'Did not find the campaign by this user id' });
    if (user.is_deactivated) {
      user = await Users.findBySub(req.user.sub);
      if (!user || !user.admin) {
        return res.status(401).json({ msg: "This user's campaigns may only be viewed by an administrator" });
      }
    }
    const campaign = await Campaigns.findCampaignByUserId(id);
    return res.status(200).json({ campaign, msg: 'The campaigns were found for this org' });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

router.get('/:id/submissions', async (req, res) => {
  const { id } = req.params;
  try {
    const applicationSubmissions = await ApplicationSubmissions.findAllByCampaignId(id);
    res.status(200).json({ applicationSubmissions, error: null });
  } catch (error) {
    res.status(500).json({ error, message: 'Unable to make request to server' });
  }
});

router.post('/', S3Upload.upload.single('photo'), async (req, res) => {
  const { location: image } = req.file;
  const { skilledImpactRequests } = req.body;
  const {
    // eslint-disable-next-line camelcase
    user_id, name, call_to_action, urgency, description,
  } = req.body;

  const postCampaign = {
    user_id, name, call_to_action, urgency,
  };

  try {
    const campaignId = await Campaigns.insert(postCampaign);
    if (campaignId) {
      await CampaignPosts.insert({
        campaign_id: campaignId, image, description, is_update: false,
      });
      if (skilledImpactRequests) await SkilledImpactRequests.insert(skilledImpactRequests, campaignId);
      const newCampaigns = await Campaigns.findById(campaignId);
      log.info(`inserted campaign ${name}`, newCampaigns);
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

router.put('/:id', S3Upload.upload.single('photo'), async (req, res) => {
  const { id } = req.params;

  const newCampaigns = pick(req.body, ['user_id', 'name', 'call_to_action', 'urgency']);
  const newCampaignPost = {};
  if (req.file) newCampaignPost.image = req.file.location;
  if (req.body.description) newCampaignPost.description = req.body.description;

  try {
    const campaign = await Campaigns.findById(id);
    const user = await Users.findBySub(req.user.sub);

    if (!campaign) {
      return res.status(404).json({ msg: 'The campaign would not be updated' });
    }
    if (campaign.user_id !== user.id && !user.admin) {
      return res.status(401).json({ msg: 'Unauthorized: You may not modify this campaign' });
    }
    const updatedCampaign = await Campaigns.update(newCampaigns, id);
    const updatedCampaignPost = req.file || req.body.description
      ? await CampaignPosts.updateOriginalPostByCampaignId(id, newCampaignPost) : {};
    const editCampaign = { ...updatedCampaign, ...updatedCampaignPost };
    res.status(200).json({ msg: 'Successfully updated campaign', editCampaign });
  } catch (err) {
    log.error(err);
    res.status(500).json({ err, msg: 'Unable to update campaign to the server' });
  }
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const user = await Users.findBySub(req.user.sub);
    const campaign = await Campaigns.findById(id);

    if (!campaign) return res.status(404).json({ msg: 'Unable to find campaign ID' });

    if (campaign.user_id !== user.id) {
      if (user.admin) {
        // Strike this user
        const targetUsr = await Users.findById(campaign.user_id);
        if (!targetUsr.is_deactivated) {
          await Users.update({ strikes: targetUsr.strikes + 1 }, targetUsr.id);
        }
      } else {
        return res.status(401).json({ msg: 'Unauthorized: You may not delete this campaign' });
      }
    }

    const campaigns = await Campaigns.remove(id);

    // Remove all reports relating to this post
    await Reports.removeWhere({ post_id: id, table_name: 'campaigns' });

    res.status(200).json(campaigns);
  } catch (err) {
    res.status(500).json({ err, msg: 'Unable to delete campaign from server' });
  }
});

module.exports = router;
