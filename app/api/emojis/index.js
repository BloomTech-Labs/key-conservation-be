const express = require('express');
const Emojis = require('../../database/models/emojiModel');
const Users = require('../../database/models/usersModel');

const logger = require('../../logger');

const checkFields = require('../../../util/checkFields');

const router = express.Router();

// Get Emojis by post id
router.put('/', async (req, res) => {
  const requiredFields = ['tableName', 'postId'];

  const error = checkFields(requiredFields, req.body);

  if (error) return res.status(400).json({ message: error });

  const emojis = await Emojis.findByPost(req.body.tableName, req.body.postId);

  return res.status(200).json(emojis);
});

// Get Emoji reactions by post ID, by emoji (Who reacted with this emoji)
// TODO: Implement

// Add emoji reaction to post
router.post('/', async (req, res) => {
  const requiredFields = ['tableName', 'postId', 'emoji'];

  const error = checkFields(requiredFields, req.body);

  if (error) return res.status(400).json({ message: error });

  try {
    const { sub } = req.user;

    const user = await Users.findBySub(sub);

    // Remove all previous reactions, if any
    await Emojis.removeByUserId(req.body.tableName, req.body.postId, user.id);

    const reaction = await Emojis.insert(
      req.body.tableName,
      req.body.postId,
      req.body.emoji,
      user.id,
    );

    return res.status(201).json(reaction);
  } catch (err) {
    logger.error(err);
    return res.status(500).json({
      message:
        'Failed to add reaction. Make sure tableName and postId are valid.',
    });
  }
});

// Remove emoji reaction from post by ID
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    await Emojis.remove(id);

    return res.sendStatus(200);
  } catch (err) {
    logger.error(JSON.stringify(err));
    return res.status(500).json({ message: err.message });
  }
});

module.exports = router;
