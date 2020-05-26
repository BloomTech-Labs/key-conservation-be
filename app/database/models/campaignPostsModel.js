const db = require('../dbConfig');

// Helper function
function getPostsWhere(where) {
  return db('campaign_posts')
    .join('campaigns', 'campaign_posts.campaign_id', 'campaigns.id')
    .join('users', 'campaigns.user_id', 'users.id')
    .leftJoin(
      'skilled_impact_requests',
      'campaigns.id',
      'skilled_impact_requests.campaign_id'
    )
    .leftJoin(
      'project_goals',
      'skilled_impact_requests.id',
      'project_goals.skilled_impact_request_id'
    )
    .leftJoin('conservationists', 'users.id', 'conservationists.user_id')
    .leftJoin('comments', 'comments.campaign_id', 'campaign_posts.campaign_id')
    .whereNot('users.is_deactivated', true)
    .where(where)
    .orderBy('campaign_posts.created_at', 'desc')
    .select(
      'campaign_posts.*',
      'campaigns.name',
      'campaigns.urgency',
      'campaigns.call_to_action',
      'users.id as user_id',
      'users.location',
      'users.profile_image',
      'conservationists.name as org_name',
      // use distinct to eliminate duplicate rows from left joins
      db.raw(
        // eslint-disable-next-line quotes
        `ARRAY_AGG(DISTINCT jsonb_build_object('id', skilled_impact_requests.id, 'skill', skilled_impact_requests.skill, 'project_goals', (select json_agg(project_goals) FROM (SELECT id, goal_title, description FROM project_goals WHERE skilled_impact_request_id = skilled_impact_requests.id) AS project_goals))) FILTER (WHERE skilled_impact_requests.id IS NOT null) AS skilled_impact_requests`
      ),
      db.raw(
        // eslint-disable-next-line quotes
        `ARRAY_AGG(DISTINCT jsonb_build_object('id', comments.id, 'user_id', comments.user_id, 'created_at', comments.created_at, 'body', comments.body)) filter (where comments.id is not null) as comments`
      )
    )
    .groupBy(
      'campaign_posts.id',
      'campaigns.name',
      'campaigns.urgency',
      'campaigns.call_to_action',
      'users.id',
      'users.location',
      'users.profile_image',
      'conservationists.name',
      'skilled_impact_requests.id'
    );
}

async function getMostRecentPosts(startAt = undefined, size = 8, date) {
  const zero = new Date(0);

  let start = startAt;

  if (!start) {
    start = new Date(Date.now()).toISOString();
  }

  let posts = await getPostsWhere(function () {
    this.where('campaign_posts.created_at', '<', start);
  }).limit(72);

  posts = posts.filter(
    (post) =>
      new Date(post.created_at).getTime() > new Date(date).getTime() ||
      zero.toISOString()
  );

  return posts.slice(0, size);
}

async function getPostsByUserId(id, startAt = undefined, size = 8) {
  let start = startAt;

  if (!start) {
    start = new Date(Date.now()).toISOString();
  }

  const posts = await getPostsWhere({ 'campaigns.user_id': id });

  const startIndex = posts.findIndex((post) => post.created_at < start);

  return posts.slice(startIndex, size);
}

async function deleteById(id) {
  const post = await db('campaign_posts').where({ id }).first();

  if (!post.is_update) {
    return db('campaigns').where({ id: post.campaign_id }).del();
  }

  return db('campaign_posts').where({ id }).del();
}

async function findById(id) {
  return getPostsWhere({ 'campaign_posts.id': id }).first();
}

async function findOriginalCampaignPostByCampaignId(campaignId) {
  return db('campaign_posts')
    .where({ campaign_id: campaignId })
    .where('is_update', false)
    .first();
}

async function findAllCampaignUpdatesByCampaignId(campaignId) {
  return getPostsWhere({ 'campaign_posts.campaign_id': campaignId });
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
