const db = require('../database/dbConfig');

module.exports = {
  find,
  findById,
  findCampById,
  insert,
  update,
  remove
};

function find() {
  return db('campaigns');
}

function findById(camp_id) {
  return db('campaigns')
    .where({ camp_id })
    .first();
}

function findCampById(users_id) {
  return db('campaigns').where({ users_id: users_id });
}

async function insert(campaign) {
  const [camp_id] = await db('campaigns')
    .insert(campaign)
    .returning('camp_id');
  if (camp_id) {
    const camp = await findById(camp_id);
    return camp;
  }
}

async function update(campaign, camp_id) {
  const editedCamp = await db('campaigns')
    .where({ camp_id })
    .update(campaign);
  if (editedCamp) {
    const camp = await findById(camp_id);
    return camp;
  }
}

function remove(camp_id) {
  return db('campaigns')
    .where({ camp_id })
    .del();
}
