const TABLE_NAME = 'supporters';
exports.seed = (knex, Promise) => knex(TABLE_NAME).del().then(() => knex(TABLE_NAME).insert([
  {
    // id: 1,
    user_id: 4,
    name: 'Michael Jordan',
  },
  {
    // id: 2,
    user_id: 5,
    name: 'Stephen Curry',
  },
]));
