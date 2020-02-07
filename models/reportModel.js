const db = require('../database/dbConfig');

module.exports = {
  find,
  findById,
  findWhere,
  insert,
  update,
  updateWhere,
  remove,
  removeWhere
};

function find() {
  return db('user_reports');
}

function findWhere(conditions) {
  return db('user_reports').where(conditions);
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

function updateWhere(cond, changes) {
  return db('user_reports')
    .where(cond)
    .update(changes);
}

function remove(id) {
  return db('user_reports')
    .where({ id })
    .del()
    .then(() => {
      return id;
    });
}

function removeWhere(cond) {
  return db('user_reports')
    .where(cond)
    .del();
}