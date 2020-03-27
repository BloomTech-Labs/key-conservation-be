exports.seed = function (knex, Promise) {
  // Deletes ALL existing entries
  return knex('conservationists')
    .del()
    .then(() =>
      // Inserts seed entries
      knex('conservationists').insert([
        {
          users_id: 1,
          org_name: 'Beaver Town',
          org_link_url: 'google.com',
          org_link_text: 'google.com',
          about_us: 'Lorem IpsOn',
          issues: 'wood',
          support_us: null,
        },
        {
          users_id: 2,
          org_name: 'Panda Lovers',
          org_link_url: 'google.com',
          org_link_text: 'google.com',
          about_us: 'Lorem IpsOn',
          issues: 'sleep',
          support_us: null,
        },
        {
          users_id: 3,
          org_name: 'Giraffe 2 Tall',
          org_link_url: 'google.com',
          org_link_text: 'google.com',
          about_us: 'Lorem IpsOn',
          issues: 'too tall',
          support_us: null,
        },
      ]));
};
