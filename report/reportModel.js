const db = require('../database/dbConfig');

module.exports = {
  find,
  findById,
  insert,
  update,
  remove
};

function find() {
  return db('reported_posts');
}

function findById(id) {
  return db('reported_posts')
    .where({ id })
    .first();
}

function insert(data) {
  return db('reported_posts')
    .insert(data)
    .returning('id');
}

function update(id, changes) {
  return db('reported_posts')
    .where({ id })
    .update(changes)
    .then(() => {
      return findById(id);
    });
}

function remove(id) {
  return db('reported_posts')
    .where({ id })
    .del()
    .then(() => {
      return id;
    });
}