const TABLE_NAME = 'bookmarks';
exports.seed = (knex, Promise) => knex(TABLE_NAME).del().then(() => knex(TABLE_NAME).insert([
  {
    id: 1,
    user_id: 4,
    campaign_id: 3,
  },
  {
    id: 2,
    user_id: 5,
    campaign_id: 4,
  },
]));
