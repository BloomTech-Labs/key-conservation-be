const express = require('express');
const log = require('../../logger');

const router = express.Router();

const Comments = require('../../models/commentsModel');

router.post('/:id', async (req, res) => {
  const newComment = {
    ...req.body,
    camp_id: req.params.id,
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
    const data = await Comments.findCampaignComments(req.params.id);
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
    const comment = Comments.findById(id);

    if(comment) {
      return res.status(200).json(comment);
    } else return res.status(404).json({message: "Comment not found!"});
  } catch (err) {
    return res.status(500).json({message: err.message || 'An error occurred retreiving this comment'})
  }
})

router.put('/com/:id', async (req, res) => {
  const { id } = req.params;
  const changes = req.body;
  try {
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
    const data = await Comments.remove(id);
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
router.get('/', async (req, res) => {
  const comments = await Comments.find();
  try {
    if (comments) {
      res.status(200).json(comments);
    } else {
      log.error('There was an error');
    }
  } catch (err) {
    res.status(500).json({ msg: 'Unable to retrieve comments' });
  }
});

module.exports = router;
