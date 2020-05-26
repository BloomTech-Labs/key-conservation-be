// WIP
const express = require('express');
const log = require('../../logger');

const router = express.Router();

const CampaignPosts = require('../../database/models/campaignPostsModel');
const Campaigns = require('../../database/models/campaignModel');
const Users = require('../../database/models/usersModel');
const Reports = require('../../database/models/reportModel');

// const S3Upload = require('../../middleware/s3Upload');
// const pick = require('../../../util/pick');

router.get('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const post = await CampaignPosts.findById(id);

    return res.status(200).json(post);
  } catch (err) {
    return res.status(500).json({
      message: `An internal error occurred while trying to retrieve campaign post ID ${id}`,
      err: err.message,
    });
  }
});

router.get('/:id/original', async (req, res) => {
  const { id } = req.params;

  try {
    const post = await CampaignPosts.findOriginalCampaignPostByCampaignId(id);

    return res.status(200).json(post);
  } catch (err) {
    return res.status(500).json({
      message: 'An internal server error occurred while retreiving that post',
    });
  }
});

router.put('/:id', async (req, res) => {
  const { id } = req.params;

  const changes = {};

  if (req.body.description) changes.description = req.body.description;
  else return res.sendStatus(200);

  try {
    const originalUpdate = await CampaignPosts.findById(id);
    const usr = await Users.findBySub(req.user.sub);

    if (!originalUpdate) {
      return res
        .status(404)
        .json({ msg: 'The campaign update would not be updated' });
    }
    if (usr.id !== originalUpdate.user_id && !usr.admin) {
      return res
        .status(401)
        .json({ msg: 'Unauthorized: You may not modify this post' });
    }

    const campaignPost = await CampaignPosts.updateById(id, changes);
    res
      .status(200)
      .json({ msg: 'Successfully updated campaign update', campaignPost });
  } catch (err) {
    log.error(err);
    res.status(500).json({ err, msg: 'Unable to update the update' });
  }
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const usr = await Users.findBySub(req.user.sub);
    const post = await CampaignPosts.findById(id);
    const campaign = await Campaigns.findById(post.campaign_id);

    if (campaign.user_id !== usr.id) {
      if (usr.admin) {
        // Strike this user because an admin had to remove their post
        const targetUsr = await Users.findById(campaign.user_id);

        if (!targetUsr.is_deactivated) {
          const updates = {
            strikes: targetUsr.strikes + 1,
          };

          await Users.update(updates, targetUsr.id);
        }
      } else {
        return res
          .status(401)
          .json({ msg: 'Unauthorized: You may not delete this post' });
      }
    }

    // deleteById handles deleting Campaign entries if this post
    // is not an update post
    const campaignPosts = await CampaignPosts.deleteById(id);

    // Remove all reports relating to this update

    await Reports.removeWhere({ post_id: id, table_name: 'campaign_updates' });

    if (campaignPosts) {
      res.status(200).json(campaignPosts);
    } else {
      res.status(404).json({ msg: 'Unable to find campaign update ID' });
    }
  } catch (err) {
    log.error(err);
    res
      .status(500)
      .json({ err, msg: 'Unable to delete campaign update from server' });
  }
});

module.exports = router;
