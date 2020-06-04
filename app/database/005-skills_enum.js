const TABLE_NAME = 'skill_enum';
exports.seed = (knex, Promise) => knex(TABLE_NAME).del().then(() => knex(TABLE_NAME).insert([
  {
    pkey: 1,
    skill: 'ARCHITECTURE',
  },
  {
    pkey: 2,
    skill: 'DRONE',
  },
  {
    pkey: 3,
    skill: 'FUNDRAISING',
  },
  {
    pkey: 4,
    skill: 'LEGAL',
  },
  {
    pkey: 5,
    skill: 'FUNDRAISING',
  },
  {
    pkey: 6,
    skill: 'PHOTOGRAPHY',
  },
  {
    pkey: 7,
    skill: 'RESEARCH',
  },
]));
