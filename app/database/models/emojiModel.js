const db = require('../dbConfig.js');

const findByCampaignPost = (id) => db('emojis').pluck('emoji').where({ is_comment: false, post_id: id });

const findUserReactionByCampaignPost = (id, sub) => db('emojis').pluck('emoji').where({ is_comment: false, post_id: id, user_id: sub });

// *** A version of this is to be implemented in the near future ***
// const findUserIdsByReaction = async (tableName, postId, emoji) => {
//   const [targetPost] = await db(tableName).where({ id: postId });

//   if (!targetPost) {
//     throw new Error(
//       `A post with that ID in table ${tableName} could not be found`,
//     );
//   }

//   return db('emojis')
//     .select('user_id')
//     .where({ table_name: tableName, post_id: postId, emoji });
// };

const addUserReactionToPost = async (id, userId, emoji) => {
  // If a user already had a reaction on this post, remove it
  await db('emojis').where({ is_comment: false, post_id: id, user_id: userId }).del();

  return db('emojis').insert({
    is_comment: false,
    post_id: id,
    user_id: userId,
    emoji,
  });
};

const removeUserReactionFromPost = (id, userId) => db('emojis').where({ is_comment: false, post_id: id, user_id: userId }).del();

module.exports = {
  findByCampaignPost,
  findUserReactionByCampaignPost,
  addUserReactionToPost,
  removeUserReactionFromPost,
};
