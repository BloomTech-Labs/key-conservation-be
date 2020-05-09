const express = require('express');
const log = require('../../logger');

const router = express.Router();

const Campaigns = require('../../database/models/campaignModel');
const CampaignPosts = require('../../database/models/campaignPostsModel');
const Users = require('../../database/models/usersModel');
const Reports = require('../../database/models/reportModel');

const S3Upload = require('../../middleware/s3Upload');

router.get('/', async (req, res) => {
  try {
    const campaignUpdate = await CampaignPosts.findAllCampaignUpdates();
    if (campaignUpdate) {
      res.status(200).json({ campaignUpdate, msg: 'The campaign updates were found' });
    } else {
      res.status(404).json({ msg: 'Campaign updates were not found in the database' });
    }
  } catch (err) {
    log.error(err);
    res.status(500).json({ err, msg: 'Unable to make request to server' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const campaignUpdate = await CampaignPosts.findCampaignUpdateById(req.params.id);
    if (campaignUpdate.is_deactivated) {
      const usr = await Users.findBySub(req.user.sub);

      if (!usr.admin) {
        return res.status(401).json({ msg: 'This post may only be viewed by an administrator' });
      }
    }

    if (campaignUpdate) {
      res.status(200).json({ campaignUpdate, msg: 'The campaign update was found' });
    } else {
      res.status(404).json({ msg: 'Campaign update was not found in the database' });
    }
  } catch (err) {
    res.status(500).json({ err, msg: 'Unable to make request to server' });
  }
});

router.get('/camp/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const campaign = await Campaigns.findById(id);
    if (!campaign) return res.status(400).json({ msg: 'This campaign does not exist' });
    if (campaign.is_deactivated) {
      const user = await Users.findBySub(req.user.id);
      if (!user || !user.admin) return res.status(401).json({ msg: 'This post may only be viewed by an administrator' });
    }
    const { updates } = campaign;
    if (updates.length === 0) return res.status(400).json({ msg: 'This campaign does not have an update yet' });
    return res.status(200).json({ updates, msg: 'The updates were found for this campaign' });
  } catch (err) {
    return res.status(500).json({ err, msg: 'Unable to make request to server' });
  }
});

router.put('/:id', S3Upload.upload.single('photo'), async (req, res) => {
  const { id } = req.params;
  const changes = {};
  if (req.body.description) changes.description = req.body.description;
  if (req.file) changes.image = req.file.location;

  try {
    const originalUpdate = await CampaignPosts.findById(id);
    const usr = await Users.findBySub(req.user.sub);

    if (!originalUpdate) return res.status(404).json({ msg: 'The campaign update would not be updated' });
    if (usr.id !== originalUpdate.user_id && !usr.admin) {
      return res.status(401).json({ msg: 'Unauthorized: You may not modify this post' });
    }

    const campaignUpdate = await CampaignPosts.updateById(id, changes);
    res.status(200).json({ msg: 'Successfully updated campaign update', campaignUpdate });
  } catch (err) {
    log.error(err);
    res.status(500).json({ err, msg: 'Unable to update the update' });
  }
});

// TODO: Delete
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const usr = await Users.findBySub(req.user.sub);
    const campaignUpdate = await CampaignPosts.findById(id);

    if (campaignUpdate.user_id !== usr.id) {
      if (usr.admin) {
        // Strike this user
        const campaign = await Campaigns.findById(campaignUpdate.campaign_id);

        const targetUsr = await Users.findById(campaign.user_id);

        if (!targetUsr.is_deactivated) {
          const updates = {
            strikes: targetUsr.strikes + 1,
          };

          await Users.update(updates, targetUsr.id);
        }
      } else {
        return res.status(401).json({ msg: 'Unauthorized: You may not delete this post' });
      }
    }

    const campaignUpdates = await CampaignPosts.deleteById(id);

    // Remove all reports relating to this update

    await Reports.removeWhere({ post_id: id, table_name: 'campaign_updates' });

    if (campaignUpdates) {
      res.status(200).json(campaignUpdates);
    } else {
      res.status(404).json({ msg: 'Unable to find campaign update ID' });
    }
  } catch (err) {
    log.error(err);
    res.status(500).json({ err, msg: 'Unable to delete campaign update from server' });
  }
});

module.exports = router;
