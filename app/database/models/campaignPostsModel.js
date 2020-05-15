const db = require('../dbConfig');

async function getMostRecentPosts(startAt = 0, size = 8, date, filters = {}) {
  const { skill } = filters;

  const zero = new Date(0);

  const posts = await db('campaign_posts')
    .join('campaigns', 'campaign_posts.campaign_id', 'campaigns.id')
    .join('users', 'campaigns.user_id', 'users.id')
    .join(
      'skilled_impact_requests',
      'skilled_impact_requests.campaign_id',
      'campaigns.id',
    )
    .leftJoin('conservationists', 'users.id', 'conservationists.user_id')
    .leftJoin('comments', 'comments.campaign_id', 'campaign_posts.campaign_id')
    .orderBy('campaign_posts.id', 'desc')
    .whereNot('users.is_deactivated', true)
    .andWhere('campaign_posts.created_at', '>=', date || zero.toISOString())
    .select(
      'campaign_posts.*',
      'campaigns.name',
      'campaigns.urgency',
      'users.id as user_id',
      'users.location',
      'users.profile_image',
      'conservationists.name as org_name',
      'skilled_impact_requests.skill',
      'skilled_impact_requests.id as skilled_impact_request_id',
      db.raw(
        // eslint-disable-next-line quotes
        `ARRAY_AGG(json_build_object('id', comments.id, 'user_id', comments.user_id, 'created_at', comments.created_at, 'body', comments.body)) filter (where comments.id is not null) as comments`,
      ),
    )
    .groupBy(
      'campaign_posts.id',
      'campaigns.name',
      'campaigns.urgency',
      'users.id',
      'users.location',
      'users.profile_image',
      'conservationists.name',
      'skilled_impact_requests.id',
      'skilled_impact_requests.skill'
    )
    .limit(72);

  return posts.slice(startAt, size);
}

async function getPostsByUserId(id, startAt = 0, size = 8) {
  const posts = await db('campaign_posts')
    .join('campaigns', 'campaigns.id', 'campaign_posts.campaign_id')
    .where('campaigns.user_id', id)
    .join('users', 'users.id', 'campaigns.user_id')
    .leftJoin('conservationists as cons', 'cons.user_id', 'users.id')
    .select(
      'cons.name as org_name',
      'users.profile_image',
      'users.location',
      'campaign_posts.*',
      'campaigns.urgency',
      'campaigns.name',
      'campaigns.user_id',
    )
    .orderBy('campaign_posts.created_at', 'desc');

  return posts.slice(startAt, size);
}

async function deleteById(id) {
  const post = await db('campaign_posts').where({ id }).first();

  if (!post.is_update) {
    return db('campaigns').where({ id: post.campaign_id }).del();
  }

  return db('campaign_posts').where({ id }).del();
}

async function findById(id) {
  return db('campaign_posts')
    .join('campaigns', 'campaign_posts.campaign_id', 'campaigns.id')
    .join('users', 'campaigns.user_id', 'users.id')
    .leftJoin('conservationists', 'users.id', 'conservationists.user_id')
    .where('campaign_posts.id', id)
    .andWhere('users.is_deactivated', false)
    .select(
      'campaign_posts.*',
      'campaigns.name',
      'users.id as user_id',
      'users.is_deactivated',
      'users.location',
      'users.profile_image',
      'conservationists.name as org_name',
    )
    .first();
}

async function findOriginalCampaignPostByCampaignId(campaignId) {
  return db('campaign_posts')
    .where({ campaign_id: campaignId })
    .where('is_update', false)
    .first();
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
      'conservationists.name as org_name',
    );
}

async function insert(post) {
  return db('campaign_posts').insert(post).returning('*');
}

async function updateById(id, changes) {
  return db('campaign_posts').where({ id }).update(changes).returning('*');
}

module.exports = {
  deleteById,
  getMostRecentPosts,
  getPostsByUserId,
  findById,
  findOriginalCampaignPostByCampaignId,
  findAllCampaignUpdatesByCampaignId,
  insert,
  updateById,
};
