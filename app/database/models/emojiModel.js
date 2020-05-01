const db = require('../dbConfig.js');

const findByPost = (tableName, postId) => db('emojis').where({ post_id: postId, table_name: tableName });

const insert = async (tableName, postId, emoji, userId) => {
  // This is to make sure this exists
  const [targetPost] = await db(tableName).where({ id: postId });

  if (!targetPost) {
    throw new Error(
      `A post with that ID in table ${tableName} could not be found`,
    );
  }

  return db('emojis').insert({
    table_name: tableName,
    post_id: postId,
    user_id: userId,
    emoji,
  });
};

module.exports = {
  findByPost,
  insert,
};
