const express = require('express');
const log = require('../../logger');

const router = express.Router();

const Reports = require('../../models/reportModel');
const Comments = require('../../models/commentsModel');
const Campaigns = require('../../models/campaignModel');
const Users = require('../../models/usersModel');

router.post('/:id', async (req, res) => {

  const { comment_body } = req.body;
  const { id } = req.params;

  if(typeof comment_body !== 'string' || !comment_body.trim()) {
    return res.status(400).json({msg: "The comment_body field is required"});
  }

  const user = await Users.findBySub(req.user.sub);
  
  const camp = await Campaigns.findCampaign(id);

  if(!camp) return res.status(404).json({msg: "A campaign with that ID could not be found!"});

  const newComment = {
    comment_body: comment_body.trim(),
    users_id: user.id,
    camp_id: id
  };
  try {
    const data = await Comments.insert(newComment);
    if (data) {
      res.status(201).json({ data, msg: 'Comment added to database' });
    } else if (!comment_body) {
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

    const camp = await Campaigns.findById(id);

    if (camp.is_deactivated) {
      const reqUsr = await Users.findBySub(req.user.sub);

      if (!reqUsr.admin) {
        return res.status(401).json({
          msg:
            'Comments for this campaign may only be viewed by an administrator'
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

router.get('/com/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const comment = await Comments.findById(id);
    const usr = await Users.findById(comment.users_id);

    const camp = await Campaigns.findById(comment.camp_id);

    if (camp.is_deactivated || usr.is_deactivated) {
      const reqUsr = await Users.findBySub(req.user.sub);

      if (!reqUsr.admin)
        return res
          .status(401)
          .json({ msg: 'This comment may only be viewed by an administrator' });
    }

    if (comment) {
      return res.status(200).json(comment);
    } else return res.status(404).json({ message: 'Comment not found!' });
  } catch (err) {
    return res.status(500).json({
      message: err.message || 'An error occurred retreiving this comment'
    });
  }
});

router.put('/com/:id', async (req, res) => {
  const { id } = req.params;
  const changes = req.body;
  try {
    const user = await Users.findBySub(req.user.sub);

    const comment = await Comments.findById(id);

    if (user.id !== comment.users_id && !user.admin) {
      return res
        .status(401)
        .json({ msg: 'Unauthorized: You may not modify this comment' });
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

    if (user.id !== comment.users_id) {
      if (user.admin) {
        // If it's an admin deleting this, give this user a strike
        const targetUsr = await Users.findById(comment.users_id);

        // Don't affect the strike counter if user is deactivated
        if (!targetUsr.is_deactivated) {
          const updates = {
            strikes: targetUsr.strikes + 1
          };

          await Users.update(updates, targetUsr.id);
        }
      } else
        return res
          .status(401)
          .json({ msg: 'Unauthorized: You may not delete this comment' });
    }

    const data = await Comments.remove(id);

    // remove all reports relating to this comment
    await Reports.removeWhere({post_id: id, table_name: 'comments'})

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

// Retrieves all comments in the database. Only use for testing.
// router.get('/', async (req, res) => {
//   const comments = await Comments.find();
//   try {
//     if (comments) {
//       res.status(200).json(comments);
//     } else {
//       log.error('There was an error');
//     }
//   } catch (err) {
//     res.status(500).json({ msg: 'Unable to retrieve comments' });
//   }
// });

module.exports = router;
