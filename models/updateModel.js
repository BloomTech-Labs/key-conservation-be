const db = require('../database/dbConfig');

function find() {
  return db('campaignUpdates')
    .join('campaigns', 'campaigns.camp_id', 'campaignUpdates.camp_id')
    .join('users', 'users.id', 'campaignUpdates.users_id')
    .leftJoin('conservationists as cons', 'cons.users_id', 'users.id')
    .select(
      'users.id as users_id',
      'cons.org_name as name',
      'users.profile_image',
      'users.location',
      'users.is_deactivated',
      'campaigns.camp_name',
      'campaignUpdates.*',
    )
    .then(updates => updates.filter(update => !update.is_deactivated))
    .then((updates) => db('likes').then((likes) => updates.map((up) => ({
      ...up,
      likes: likes.filter((like) => like.update_id === up.update_id),
    }))));
}

function findById(update_id) {
  return db('campaignUpdates')
    .join('campaigns', 'campaigns.camp_id', 'campaignUpdates.camp_id')
    .join('users', 'users.id', 'campaignUpdates.users_id')
    .leftJoin('conservationists as cons', 'cons.users_id', 'users.id')
    .where('campaignUpdates.update_id', update_id)
    .select(
      'users.id as users_id',
      'cons.org_name as name',
      'users.profile_image',
      'users.location',
      'users.is_deactivated',
      'campaigns.camp_name',
      'campaignUpdates.*',
    )
    .first();
}

function findCamp(camp_id) {
  return db('campaigns')
    .where({ camp_id })
    .first();
}

function findUpdatesByCamp(camp_id) {
  return db('campaignUpdates')
    .join('campaigns', 'campaigns.camp_id', 'campaignUpdates.camp_id')
    .join('users', 'users.id', 'campaignUpdates.users_id')
    .leftJoin('conservationists', 'cons.users_id', 'users.id')
    .where('campaignUpdates.camp_id', camp_id)
    .select(
      'cons.org_name as name',
      'users.profile_image',
      'users.location',
      'campaigns.camp_name',
      'campaignUpdates.*',
    )
    .then((updates) => db('likes').then((likes) => {
      updates.map((u) => (u.likes = likes.filter(
        (like) => like.update_id === u.update_id,
      )));
      return updates;
    }));
}

function findUpdatesByUser(users_id) {
  return db('campaignUpdates')
    .join('campaigns', 'campaigns.camp_id', 'campaignUpdates.camp_id')
    .join('users', 'users.id', 'campaignUpdates.users_id')
    .leftJoin('conservationists as cons', 'cons.users_id', 'users.id')
    .where('campaignUpdates.users_id', users_id)
    .select(
      'cons.org_name as name',
      'users.profile_image',
      'users.location',
      'campaigns.camp_name',
      'campaignUpdates.*',
    )
    .then((updates) => db('likes').then((likes) => {
      updates.map((u) => (u.likes = likes.filter(
        (like) => like.update_id === u.update_id,
      )));
      return updates;
    }));
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
