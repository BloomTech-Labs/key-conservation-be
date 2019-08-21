const db = require('../database/dbConfig');

module.exports = {
  find,
  findById,
  findUpdatesByCamp,
  findUpdatesByUser,
  insert,
  update,
  remove
};

function find() {
  return db('campaignUpdates')
  .join('campaigns', 'campaigns.camp_id', 'campaignUpdates.camp_id')
  .join('users', 'users.id', 'campaignUpdates.users_id')
  .select('users.username', 'users.profile_image', 'users.location', 'campaigns.camp_name', 'campaignUpdates.*')
}

function findById(update_id) {
  return db('campaignUpdates')
    .where({ update_id })
    .join('campaigns', 'campaigns.camp_id', 'campaignUpdates.camp_id')
    .join('users', 'users.id', 'campaignUpdates.users_id')
    .select('users.username', 'users.profile_image', 'users.location', 'campaigns.camp_name', 'campaignUpdates.*')
    .first();
}

function findUpdatesByCamp(camp_id) {
  return db('campaignUpdates')
    .where({ camp_id })
    .join('campaigns', 'campaigns.camp_id', 'campaignUpdates.camp_id')
    .join('users', 'users.id', 'campaignUpdates.users_id')
    .select('users.username', 'users.profile_image', 'users.location', 'campaigns.camp_name', 'campaignUpdates.*')
}

function findUpdatesByUser(users_id) {
  return db('campaignUpdates')
    .where({ users_id })
    .join('campaigns', 'campaigns.camp_id', 'campaignUpdates.camp_id')
    .join('users', 'users.id', 'campaignUpdates.users_id')
    .select('users.username', 'users.profile_image', 'users.location', 'campaigns.camp_name', 'campaignUpdates.*')
}

async function insert(campUpdate) {
  const [update_id] = await db('campaignUpdates')
    .insert(campUpdate)
    .returning('update_id');
  if (update_id) {
    const campUpdate = await findById(update_id);
    return campUpdate;
  }
}

async function update(changes, update_id) {
  const editedCampUpdate = await db('campaignUpdates')
    .where({ update_id })
    .update(changes);
  if (editedCampUpdate) {
    const campUpdate = await findById(update_id);
    return campUpdate;
  }
}

async function remove(update_id) {
  const deleted = await db('campaignUpdates')
    .where({ update_id })
    .del();
  if (deleted) {
    return update_id
  } else {
    return 0
  }
}
