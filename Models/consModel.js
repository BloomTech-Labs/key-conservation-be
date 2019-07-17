const db = require('../database/dbConfig');

module.exports = {
  find,
  findById,
  insert,
  update,
  remove
};

function find() {
  return db('conservationists');
}

function findById(id) {
  return db('conservationists')
    .where({ id })
    .first();
}

function insert(conservationist) {
  return db('conservationists')
    .insert(conservationist)
    .returning('id');
}

function update(id, conservationist) {
  return db('conservationists')
    .where({ id })
    .update(conservationist);
}

function remove(id) {
  return db('conservationists')
    .where({ id })
    .del();
}
