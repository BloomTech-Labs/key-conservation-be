const TABLE_NAME = 'comments';
exports.seed = (knex, Promise) => knex(TABLE_NAME).del().then(() => knex(TABLE_NAME).insert([
  {
    id: 1,
    campaign_id: 1,
    user_id: 3,
    body: 'Nice job!',
  },
  {
    id: 1,
    campaign_id: 2,
    user_id: 4,
    body: 'Cool!',
  },
  {
    id: 1,
    campaign_id: 3,
    user_id: 4,
    body: 'Very cool!',
  },
  {
    id: 1,
    campaign_id: 3,
    user_id: 2,
    body: 'That\'s so inspiring',
  },
  {
    id: 1,
    campaign_id: 4,
    user_id: 1,
    body: 'Wish we could\'ve joined you there',
  },
]));
