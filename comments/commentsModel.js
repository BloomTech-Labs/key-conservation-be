const db = require('../database/dbConfig');

module.exports = {
  find,
  findCampaignComments,
  insert,
  update,
  remove
};

function find() {
  return db('comments');
}

function findById(id) {
  return db('comments')
    .where({ comment_id: id })
    .first();
}

function findCampaignComments(id) {
  return db('comments').where({ camp_id: id });
}

function insert(comment) {
  return db('comments').insert(comment);
}

function update(id, changes) {
  return db('comments')
    .where({ comment_id: id })
    .update(changes)
    .then(() => {
      return findById(id);
    });
}

function remove(id) {
  return db('tech')
    .where({ comment_id: id })
    .del();
}
