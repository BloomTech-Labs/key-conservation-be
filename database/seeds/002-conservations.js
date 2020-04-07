exports.seed = function (knex, Promise) {
  // Deletes ALL existing entries
  return knex('conservationists')
    .del()
    .then(() => knex('conservationists').insert([
      {
        user_id: 1,
        name: 'Beaver Town',
        link_url: 'google.com',
        link_text: 'google.com',
        about_us: 'Lorem IpsOn',
        issues: 'wood',
        support_us: null,
      },
      {
        user_id: 2,
        name: 'Panda Lovers',
        link_url: 'google.com',
        link_text: 'google.com',
        about_us: 'Lorem IpsOn',
        issues: 'sleep',
        support_us: null,
      },
      {
        user_id: 3,
        name: 'Giraffe 2 Tall',
        link_url: 'google.com',
        link_text: 'google.com',
        about_us: 'Lorem IpsOn',
        issues: 'too tall',
        support_us: null,
      },
    ]));
};
