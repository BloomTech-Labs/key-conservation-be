const db = require('../database/dbConfig');

function find() {
  return db('campaign_updates')
    .join('campaigns', 'campaigns.camp_id', 'campaign_updates.camp_id')
    .join('users', 'users.id', 'campaign_updates.users_id')
    .leftJoin('conservationists as cons', 'cons.users_id', 'users.id')
    .select(
      'users.id as users_id',
      'cons.org_name as name',
      'users.profile_image',
      'users.location',
      'users.is_deactivated',
      'campaigns.camp_name',
      'campaign_updates.*',
    )
    .then((updates) => updates.filter((update) => !update.is_deactivated));
}

function findById(update_id) {
  return db('campaign_updates')
    .join('campaigns', 'campaigns.camp_id', 'campaign_updates.camp_id')
    .join('users', 'users.id', 'campaign_updates.users_id')
    .leftJoin('conservationists as cons', 'cons.users_id', 'users.id')
    .where('campaign_updates.update_id', update_id)
    .select(
      'users.id as users_id',
      'cons.org_name as name',
      'users.profile_image',
      'users.location',
      'users.is_deactivated',
      'campaigns.camp_name',
      'campaign_updates.*',
    )
    .first();
}

function findCamp(camp_id) {
  return db('campaigns')
    .where({ camp_id })
    .first();
}

function findUpdatesByCamp(camp_id) {
  return db('campaign_updates')
    .join('campaigns', 'campaigns.camp_id', 'campaign_updates.camp_id')
    .join('users', 'users.id', 'campaign_updates.users_id')
    .leftJoin('conservationists as cons', 'cons.users_id', 'users.id')
    .where('campaign_updates.camp_id', camp_id)
    .select(
      'cons.org_name as name',
      'users.profile_image',
      'users.location',
      'campaigns.camp_name',
      'campaign_updates.*',
    );
}

function findUpdatesByUser(users_id) {
  return db('campaign_updates')
    .join('campaigns', 'campaigns.camp_id', 'campaign_updates.camp_id')
    .join('users', 'users.id', 'campaign_updates.users_id')
    .leftJoin('conservationists as cons', 'cons.users_id', 'users.id')
    .where('campaign_updates.users_id', users_id)
    .select(
      'cons.org_name as name',
      'users.profile_image',
      'users.location',
      'campaigns.camp_name',
      'campaign_updates.*',
    );
}

async function insert(campUpdate) {
  const [update_id] = await db('campaign_updates')
    .insert(campUpdate)
    .returning('update_id');
  if (update_id) {
    const campUpdate = await findById(update_id);
    return campUpdate;
  }
}

async function update(changes, update_id) {
  const editedCampUpdate = await db('campaign_updates')
    .where({ update_id })
    .update(changes);
  if (editedCampUpdate) {
    const campUpdate = await findById(update_id);
    return campUpdate;
  }
}

async function remove(update_id) {
  const deleted = await db('campaign_updates')
    .where({ update_id })
    .del();
  if (deleted) {
    return update_id;
  }
  return 0;
}

module.exports = {
  find,
  findById,
  findCamp,
  findUpdatesByCamp,
  findUpdatesByUser,
  insert,
  update,
  remove,
};
