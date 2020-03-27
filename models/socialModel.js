const db = require('../database/dbConfig');

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
  findUserBookmarks,
  insertBookmark,
  removeBookmark,
};
