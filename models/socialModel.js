const db = require('../database/dbConfig');

function findUserBookmarks(id) {
  return db('bookmarks').where({ user_id: id });
}

function insertBookmark(bookmark) {
  return db('bookmarks').insert(bookmark);
}

function removeBookmark(campaign_id, user_id) {
  return db('bookmarks')
    .where({ campaign_id, user_id })
    .del();
}

module.exports = {
  findUserBookmarks,
  insertBookmark,
  removeBookmark,
};
