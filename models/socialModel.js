const db = require('../database/dbConfig');

function findUserBookmarks(id) {
  return db('bookmarks').where({ user_id: id });
}

function insertBookmark(bookmark) {
  return db('bookmarks').insert(bookmark);
}

function removeBookmark(campaignId, userId) {
  return db('bookmarks')
    .where({ campaign_id: campaignId, user_id: userId })
    .del();
}

module.exports = {
  findUserBookmarks,
  insertBookmark,
  removeBookmark,
};
