const db = require('../database/dbConfig');

module.exports = {
  insert,
  remove
};

function findCampaignLikes(id) {
  return db('likes').where({ camp_id: id });
}

function insert(like) {
  return db('likes')
    .insert(like)
    .then(() => {
      return findCampaignLikes(like.camp_id);
    });
}

function remove(id) {
  return db('likes')
    .where({ like_id: id })
    .del();
}
