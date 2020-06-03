const db = require('../dbConfig');

function findUserBookmarks(id) {
  return db('bookmarks')
    .join('campaigns', 'campaigns.id', 'bookmarks.campaign_id')
    .leftJoin(
      'campaign_posts',
      'campaign_posts.campaign_id',
      'bookmarks.campaign_id',
    )
    .join('users', 'users.id', 'campaigns.user_id')
    .leftJoin('comments', 'comments.campaign_id', 'bookmarks.campaign_id')
    .leftJoin('conservationists as cons', 'cons.user_id', 'users.id')
    .select(
      'campaign_posts.*',
      'campaigns.name',
      'campaigns.urgency',
      'users.id as users_id',
      'users.location',
      'users.profile_image',
      'cons.name as org_name',
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
      'cons.name',
    )
    .whereNot('users.is_deactivated', true)
    .andWhere('bookmarks.user_id', id)
    .andWhere('campaign_posts.is_update', false);
}

function insertBookmark(bookmark) {
  return db('bookmarks').insert(bookmark);
}

function removeBookmark(campaignId, userId) {
  return db('bookmarks')
    .where({ campaign_id: campaignId, user_id: userId })
    .del();
}

module.exports = {
  findUserBookmarks,
  insertBookmark,
  removeBookmark,
};
