const db = require('../dbConfig');

async function getMostRecentPosts(startAt = 0, size = 8) {
  const posts = await db('campaign_posts')
    .join('campaigns', 'campaign_posts.campaign_id', 'campaigns.id')
    .join('users', 'campaigns.user_id', 'users.id')
    .leftJoin('conservationists', 'users.id', 'conservationists.user_id')
    .innerJoin('comments', 'campaigns.id', 'comments.campaign_id')
    .whereNot('users.is_deactivated', true)
    .orderBy('campaign_posts.created_at', 'desc')
    .select(
      'campaign_posts.*',
      'campaigns.name',
      'campaigns.urgency',
      'users.id as user_id',
      'users.location',
      'users.profile_image',
      'conservationists.name as org_name',
      db.raw(
        // eslint-disable-next-line quotes
        `ARRAY_AGG(json_build_object('id', comments.id, 'user_id', comments.user_id, 'created_at', comments.created_at, 'body', comments.body)) as comments`,
      ),
    )
    .groupBy(
      'campaign_posts.id',
      'campaigns.name',
      'campaigns.urgency',
      'users.id',
      'users.location',
      'users.profile_image',
      'conservationists.name'
    )
    .limit(72);

  return posts.slice(startAt, size);
}

async function deleteById(id) {
  return db('campaign_id').where({ id }).del();
}

async function findById(id) {
  return db('campaign_posts')
    .join('campaigns', 'campaign_posts.campaign_id', 'campaigns.id')
    .join('users', 'campaigns.user_id', 'users.id')
    .leftJoin('conservationists', 'users.id', 'conservationists.user_id')
    .where('campaign_posts.id', id)
    .select(
      'campaign_posts.*',
      'campaigns.name',
      'users.id as user_id',
      'users.is_deactivated',
      'users.location',
      'users.profile_image',
      'conservationists.name as org_name'
    )
    .first();
}

async function findOriginalCampaignPostByCampaignId(campaignId) {
  return db('campaign_posts')
    .where({ campaign_id: campaignId })
    .where('is_update', false)
    .first();
}

async function findAllCampaignUpdates() {
  return db('campaign_posts')
    .join('campaigns', 'campaign_posts.campaign_id', 'campaigns.id')
    .join('users', 'campaigns.user_id', 'users.id')
    .leftJoin('conservationists', 'users.id', 'conservationists.user_id')
    .where({ 'users.is_deactivated': false })
    .where('campaign_posts.is_update', true)
    .select(
      'campaign_posts.*',
      'campaigns.name',
      'users.id as users_id',
      'users.location',
      'users.profile_image',
      'conservationists.name as org_name'
    );
}

async function findAllCampaignUpdatesByCampaignId(campaignId) {
  return db('campaign_posts')
    .join('campaigns', 'campaign_posts.campaign_id', 'campaigns.id')
    .join('users', 'campaigns.user_id', 'users.id')
    .leftJoin('conservationists', 'users.id', 'conservationists.user_id')
    .where('campaign_posts.campaign_id', campaignId)
    .where('campaign_posts.is_update', true)
    .select(
      'campaign_posts.*',
      'campaigns.name as campaign_name',
      'users.profile_image',
      'users.location',
      'conservationists.name as org_name'
    );
}

function findCampaignPostById(id) {
  return db('campaign_posts')
    .join('campaigns', 'campaign_posts.campaign_id', 'campaigns.id')
    .join('users', 'campaigns.user_id', 'users.id')
    .leftJoin('conservationists', 'users.id', 'conservationists.user_id')
    .where('users.is_deactivated', false)
    .andWhere('campaign_posts.id', id)
    .select(
      'campaign_posts.*',
      'campaigns.name',
      'users.id as users_id',
      'users.location',
      'users.profile_image',
      'conservationists.name as org_name'
    )
    .first();
}

async function insert(post) {
  return db('campaign_posts').insert(post);
}

async function updateById(id, changes) {
  return db('campaign_posts').where({ id }).update(changes).returning('*');
}

async function updateOriginalPostByCampaignId(campaignId, changes) {
  return db('campaign_posts')
    .where('campaign_id', campaignId)
    .update(changes)
    .returning('*');
}

module.exports = {
  deleteById,
  getMostRecentPosts,
  findCampaignPostById,
  findById,
  findOriginalCampaignPostByCampaignId,
  findAllCampaignUpdates,
  findAllCampaignUpdatesByCampaignId,
  insert,
  updateById,
  updateOriginalPostByCampaignId,
};
