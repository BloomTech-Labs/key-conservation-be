const db = require('../database/dbConfig');

module.exports = {
  findCampaignLikes,
  insert,
  remove,
  updateRemove
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

function remove(campId, userId) {
  return db('likes')
    .where({ camp_id: campId, users_id: userId })
    .del();
}

function updateRemove(updateId, userId) {
  return db('likes')
    .where({ update_id: updateId, users_id: userId })
    .del();
}
