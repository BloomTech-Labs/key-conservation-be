const db = require('../dbConfig');

async function insert(review) {
  return db('project_reviews')
    .insert(review)
    .returning('*');
}

async function findById(id) {
  return db('project_reviews')
    .where({ id })
    .first();
}

module.exports = { insert, findById };
