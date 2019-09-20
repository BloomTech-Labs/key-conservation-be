const express = require('express');
const router = express.Router();

const Comments = require('./commentsModel');

router.post('/:id', async (req, res) => {
  const newComment = {
    ...req.body,
    camp_id: req.params.id
  };
  try {
    const dataBaseResp = await Comments.insert(newComment);
    if (dataBaseResp) {
      res.status(201).json({ dataBaseResp, msg: 'Comment added to database' });
    } else {
      if (!comment_body) {
        res.status(404).json({ msg: 'Please add a body to this comment' });
      }
    }
  } catch (err) {
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
    console.log(err);
    res.status(500).json({ err, msg: 'Unable to retrieve comments' });
  }
});

router.get(`/`, async (req, res) => {
  const comments = await Comments.find();
  try {
    if (comments) {
      res.status(200).json(comments);
    } else {
      console.log('There was an error');
    }
  } catch (err) {
    res.status(500).json({ msg: 'Unable to retrieve comments' });
  }
});

module.exports = router;
