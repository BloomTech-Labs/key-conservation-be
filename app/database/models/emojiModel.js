const db = require('../dbConfig.js');

const findByPost = (tableName, postId) => db('emojis')
  .select('emoji', 'id', 'user_id')
  .where({ post_id: postId, table_name: tableName });

const findUserIdsByReaction = async (tableName, postId, emoji) => {
  const [targetPost] = await db(tableName).where({ id: postId });

  if (!targetPost) {
    throw new Error(
      `A post with that ID in table ${tableName} could not be found`,
    );
  }

  return db('emojis')
    .select('user_id')
    .where({ table_name: tableName, post_id: postId, emoji });
};

const insert = async (tableName, postId, emoji, userId) => {
  // This is to make sure this exists
  const [targetPost] = await db(tableName).where({ id: postId });

  if (!targetPost) {
    throw new Error(
      `A post with that ID in table ${tableName} could not be found`,
    );
  }

  return db('emojis')
    .insert({
      table_name: tableName,
      post_id: postId,
      user_id: userId,
      emoji,
    })
    .returning(['emoji', 'user_id', 'id']);
};

const remove = (reactionId) => db('emojis').where({ id: reactionId }).del();

const removeByUserId = async (tableName, postId, userId) => {
  const [targetPost] = await db(tableName).where({ id: postId });

  if (!targetPost) {
    throw new Error(
      `A post with that ID in table ${tableName} could not be found`,
    );
  }

  return db('emojis')
    .where({
      table_name: tableName,
      user_id: userId,
      post_id: postId,
    })
    .del();
};

module.exports = {
  findByPost,
  findUserIdsByReaction,
  insert,
  remove,
  removeByUserId,
};
