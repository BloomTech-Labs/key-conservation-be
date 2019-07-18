const db = require('../database/dbConfig');

module.exports = {
  find,
  findById,
  insert,
  update,
  remove
};

function find() {
  return db('campaigns');
}

function findById(id) {
  return db('campaigns')
    .where({ id })
    .first();
}

async function insert(campaign) {
  const [id] = await db('campaigns')
    .insert(campaign)
    .returning('id');
  if (id) {
    const camp = await findById(id);
    return camp;
  }
}
// function insert(campaign) {
//   return db('campaigns')
//     .insert(campaign)
//     .returning('id');
// }

async function update(campaign, id) {
  const editedCamp = await db('campaigns')
    .where({ id })
    .update(campaign);
  if (editedCamp) {
    const camp = await findById(id);
    return camp;
  }
}

function remove(id) {
  return db('campaigns')
    .where({ id })
    .del();
}
