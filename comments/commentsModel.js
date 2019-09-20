const db = require('../database/dbConfig');

module.exports = {
  find,
  insert
};

function find() {
  return db('comments');
}

function insert(comment) {
  return db('comments').insert(comment);
}

function update(comment) {}

function remove() {}
