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
  return db('campaigns')
    .join('users', 'users.id', 'campaigns.users_id')
    .select('users.username', 'users.profile_image', 'users.location', 'campaigns.*');
}

function findById(camp_id) {
  return db('campaigns')
    .where({ camp_id })
    .join('users', 'users.id', 'campaigns.users_id')
    .select('users.username', 'users.profile_image', 'users.location', 'campaigns.*')
    .first();
}

function findCampById(users_id) {
  return db('campaigns').where({ users_id: users_id })
    .join('users', 'users.id', 'campaigns.users_id')
    .select('users.username', 'users.profile_image', 'users.location', 'campaigns.*');
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

async function remove(camp_id) {
  const deleted = await db('campaigns')
    .where({ camp_id })
    .del();
  if (deleted) {
    return camp_id
  } else {
    return 0
  }
}
