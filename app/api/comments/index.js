const express = require('express');
const log = require('../../logger');

const router = express.Router();

const Reports = require('../../database/models/reportModel');
const Comments = require('../../database/models/commentsModel');
const Campaigns = require('../../database/models/campaignModel');
const Users = require('../../database/models/usersModel');

router.post('/:id', async (req, res) => {
  const { body } = req.body;
  const { id } = req.params;

  if (typeof body !== 'string' || !body.trim()) {
    return res.status(400).json({ msg: 'The comment_body field is required' });
  }

  const user = await Users.findBySub(req.user.sub);
  const campaign = await Campaigns.findById(id);
  if (!campaign) return res.status(404).json({ msg: 'A campaign with that ID could not be found!' });

  const newComment = {
    body: body.trim(),
    user_id: user.id,
    campaign_id: id,
  };
  try {
    const data = await Comments.insert(newComment);
    if (data) {
      res.status(201).json({ data, msg: 'Comment added to database' });
    } else if (!body) {
      res.status(404).json({ msg: 'Please add a body to this comment' });
    }
  } catch (err) {
    log.error(err);
    res.status(500).json({ err, msg: 'Unable to add comment' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const campaign = await Campaigns.findById(id);
    if (campaign.is_deactivated) {
      const reqUsr = await Users.findBySub(req.user.sub);

      if (!reqUsr.admin) {
        return res.status(401).json({
          msg: 'Comments for this campaign may only be viewed by an administrator',
        });
      }
    }

    const data = await Comments.findCampaignComments(id);
    if (data) {
      res.status(200).json({ data, msg: 'Comments were retrieved' });
    } else {
      res.status(400).json({ msg: 'Comments were not found in the database' });
    }
  } catch (err) {
    log.error(err);
    res.status(500).json({ err, msg: 'Unable to retrieve comments' });
  }
});

// TODO update API routes too
router.get('/com/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const comment = await Comments.findById(id);
    const usr = await Users.findById(comment.user_id);

    const campaign = await Campaigns.findById(comment.campaign);

    if (campaign.is_deactivated || usr.is_deactivated) {
      const reqUsr = await Users.findBySub(req.user.sub);

      if (!reqUsr.admin) {
        return res.status(401).json({ msg: 'This comment may only be viewed by an administrator' });
      }
    }

    if (comment) {
      return res.status(200).json(comment);
    }
    return res.status(404).json({ message: 'Comment not found!' });
  } catch (err) {
    return res.status(500).json({
      message: err.message || 'An error occurred retrieving this comment',
    });
  }
});

router.put('/com/:id', async (req, res) => {
  const { id } = req.params;
  const changes = req.body;
  try {
    const user = await Users.findBySub(req.user.sub);
    const comment = await Comments.findById(id);
    if (user.id !== comment.user_id && !user.admin) {
      return res.status(401).json({ msg: 'Unauthorized: You may not modify this comment' });
    }

    const data = await Comments.update(id, changes);
    if (data) {
      res.status(200).json({ data, msg: 'Comment was updated' });
    } else {
      res.status(400).json({ msg: 'Comment was not found in the database' });
    }
  } catch (err) {
    log.error(err);
    res.status(500).json({ err, msg: 'Unable to edit this comment' });
  }
});

router.delete('/com/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const user = await Users.findBySub(req.user.sub);
    const comment = await Comments.findById(id);
    if (user.id !== comment.user_id) {
      if (user.admin) {
        // If it's an admin deleting this, give this user a strike
        const targetUsr = await Users.findById(comment.user_id);

        // Don't affect the strike counter if user is deactivated
        if (!targetUsr.is_deactivated) {
          const updates = {
            strikes: targetUsr.strikes + 1,
          };

          await Users.update(updates, targetUsr.id);
        }
      } else {
        return res.status(401).json({ msg: 'Unauthorized: You may not delete this comment' });
      }
    }

    const data = await Comments.remove(id);

    // remove all reports relating to this comment
    await Reports.removeWhere({ post_id: id, table_name: 'comments' });

    if (data) {
      res.status(200).json({ data, msg: 'Comment was deleted' });
    } else {
      res.status(400).json({ msg: 'Comment was not found in the database' });
    }
  } catch (err) {
    log.error(err);
    res.status(500).json({ err, msg: 'Unable to delete this comment' });
  }
});

module.exports = router;
