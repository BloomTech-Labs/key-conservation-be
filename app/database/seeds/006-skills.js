const TABLE_NAME = 'skills';
exports.seed = (knex, Promise) => knex(TABLE_NAME).del().then(() => knex(TABLE_NAME).insert([
  {
    id: 1,
    user_id: 1,
    skill: 'ARCHITECTURE',
  },
  {
    id: 2,
    user_id: 1,
    skill: 'DRONE',
  },
  {
    id: 3,
    user_id: 1,
    skill: 'FUNDRAISING',
  },
  {
    id: 4,
    user_id: 2,
    skill: 'LEGAL',
  },
  {
    id: 5,
    user_id: 2,
    skill: 'FUNDRAISING',
  },
  {
    id: 6,
    user_id: 3,
    skill: 'PHOTOGRAPHY',
  },
  {
    id: 7,
    user_id: 4,
    skill: 'RESEARCH',
  },
]));
