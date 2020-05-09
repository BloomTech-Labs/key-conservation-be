// WIP
const express = require('express');
const log = require('../../logger');

const router = express.Router();

const CampaignPosts = require('../../database/models/campaignPostsModel');
const Users = require('../../database/models/usersModel');
const Reports = require('../../database/models/reportModel');

// const S3Upload = require('../../middleware/s3Upload');
// const pick = require('../../../util/pick');

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const usr = await Users.findBySub(req.user.sub);
    const post = await CampaignPosts.findById(id);

    if (post.user_id !== usr.id) {
      if (usr.admin) {
        // Strike this user because an admin had to remove their post
        const targetUsr = await Users.findById(post.user_id);

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
