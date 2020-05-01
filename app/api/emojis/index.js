const express = require('express');
const Emojis = require('../../database/models/emojiModel');
const Users = require('../../database/models/usersModel');

const logger = require('../../logger');

const checkFields = require('../../../util/checkFields');

const router = express.Router();

// Get Emojis by post id
router.get('/:id', (req, res) => {
  const requiredFields = ['tableName', 'postId'];

  const error = checkFields(requiredFields, req.body);

  if (error) return res.status(400).json({ message: error });

  return Emojis.findByPost(req.body.tableName, req.body.postId);
});

// Add emoji reaction to post
router.post('/:id', async (req, res) => {
  const requiredFields = ['tableName', 'postId', 'emoji'];

  const error = checkFields(requiredFields, req.body);

  if (error) return res.status(400).json({ message: error });

  try {
    const { sub } = req.user;

    const user = await Users.findBySub(sub);

    await Emojis.insert(req.body.tableName, req.body.postId, req.body.emoji, user.id);

    return res.sendStatus(200);
  } catch (err) {
    logger.error(err);
    return res
      .status(500)
      .json({
        message:
          'Failed to add reaction. Make sure tableName and postId are valid.',
      });
  }
});

module.exports = router;
