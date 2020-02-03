const db = require('../database/dbConfig');

module.exports = {
  find,
  findById,
  insert,
  update,
  remove
};

function find() {
  return db('user_reports');
}

function findById(id) {
  return db('user_reports')
    .where({ id })
    .first();
}

function insert(data) {
  return db('user_reports')
    .insert(data)
    .returning('id');
}

function update(id, changes) {
  return db('user_reports')
    .where({ id })
    .update(changes)
    .then(() => {
      return findById(id);
    });
}

function remove(id) {
  return db('user_reports')
    .where({ id })
    .del()
    .then(() => {
      return id;
    });
}