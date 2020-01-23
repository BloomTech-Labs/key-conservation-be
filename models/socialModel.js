const db = require('../database/dbConfig');

function findCampaignLikes(id) {
  return db('likes').where({ camp_id: id });
}

function findUpdateLikes(id) {
  return db('likes').where({ update_id: id });
}

function insert(like) {
  return db('likes')
    .insert(like)
    .then(() => findCampaignLikes(like.camp_id));
}

function updateInsert(like) {
  return db('likes')
    .insert(like)
    .then(() => findUpdateLikes(like.update_id));
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

function findUserBookmarks(id) {
  return db('bookmarks').where({ users_id: id });
}

function insertBookmark(bookmark) {
  return db('bookmarks').insert(bookmark);
}

function removeBookmark(campId, userId) {
  return db('bookmarks')
    .where({ camp_id: campId, users_id: userId })
    .del();
}

module.exports = {
  findCampaignLikes,
  findUpdateLikes,
  insert,
  updateInsert,
  remove,
  updateRemove,
  findUserBookmarks,
  insertBookmark,
  removeBookmark,
};
