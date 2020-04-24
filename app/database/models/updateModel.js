const db = require('../dbConfig');

function find() {
  return db('campaign_updates')
    .join('campaigns', 'campaigns.id', 'campaign_updates.campaign_id')
    .join('users', 'users.id', 'campaign_updates.user_id')
    .leftJoin('conservationists as cons', 'cons.user_id', 'users.id')
    .select(
      'users.id as users_id',
      'cons.name as org_name',
      'users.profile_image',
      'users.location',
      'users.is_deactivated',
      'campaigns.name',
      'campaign_updates.*',
    )
    .where({ 'users.is_deactivated': false });
}

function findById(id) {
  return db('campaign_updates')
    .join('campaigns', 'campaigns.id', 'campaign_updates.campaign_id')
    .join('users', 'users.id', 'campaign_updates.user_id')
    .leftJoin('conservationists as cons', 'cons.user_id', 'users.id')
    .where('campaign_updates.id', id)
    .select(
      'users.id as users_id',
      'cons.name as org_name',
      'users.profile_image',
      'users.location',
      'users.is_deactivated',
      'campaigns.name',
      'campaign_updates.*',
    )
    .first();
}

async function findUpdatesByCamp(id) {
  return db('campaign_updates')
    .join('campaigns', 'campaigns.id', 'campaign_updates.campaign_id')
    .join('users', 'users.id', 'campaign_updates.user_id')
    .leftJoin('conservationists as cons', 'cons.user_id', 'users.id')
    .where('campaign_updates.campaign_id', id)
    .select(
      'cons.name as org_name',
      'users.profile_image',
      'users.location',
      'campaigns.name as campaign_name',
      'campaign_updates.*',
    );
}

async function findUpdatesByUser(id) {
  return db('campaign_updates')
    .join('campaigns', 'campaigns.id', 'campaign_updates.campaign_id')
    .join('users', 'users.id', 'campaign_updates.user_id')
    .leftJoin('conservationists as cons', 'cons.user_id', 'users.id')
    .where('campaign_updates.user_id', id)
    .select(
      'cons.name as org_name',
      'users.profile_image',
      'users.location',
      'campaigns.name as campaign_name',
      'campaign_updates.*',
    );
}

async function insert(campaignUpdate) {
  const [id] = await db('campaign_updates')
    .insert(campaignUpdate)
    .returning('id');
  if (id) {
    return findById(id);
  }
}

async function update(changes, id) {
  const editedCampaignUpdate = await db('campaign_updates')
    .where({ id })
    .update(changes);
  if (editedCampaignUpdate) {
    return findById(id);
  }
}

async function remove(id) {
  const deleted = await db('campaign_updates')
    .where({ id })
    .del();
  if (deleted) {
    return id;
  }
  return 0;
}

module.exports = {
  find,
  findById,
  findUpdatesByCamp,
  findUpdatesByUser,
  insert,
  update,
  remove,
};
