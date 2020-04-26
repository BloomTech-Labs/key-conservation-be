const TABLE_NAME = 'conservationists';
exports.seed = (knex, Promise) => knex(TABLE_NAME).del().then(() => knex(TABLE_NAME).insert([
  {
    id: 1,
    user_id: 1,
    name: 'Beaver Town',
    link_url: 'google.com',
    link_text: 'google.com',
    about_us: 'Lorem IpsOn',
    issues: 'wood',
    support_us: null,
  },
  {
    id: 2,
    user_id: 2,
    name: 'Panda Lovers',
    link_url: 'google.com',
    link_text: 'google.com',
    about_us: 'Lorem IpsOn',
    issues: 'sleep',
    support_us: null,
  },
  {
    id: 3,
    user_id: 3,
    name: 'Giraffe 2 Tall',
    link_url: 'google.com',
    link_text: 'google.com',
    about_us: 'Lorem IpsOn',
    issues: 'too tall',
    support_us: null,
  },
]));
