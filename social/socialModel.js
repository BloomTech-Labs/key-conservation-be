const db = require('../database/dbConfig');

module.exports = {
  insert
};

function insert(like) {
  return db('likes').insert(like);
}
