exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('conservationists')
    .del()
    .then(function() {
      // Inserts seed entries
      return knex('conservationists').insert([
        {
          users_id: 1,
          org_name: 'Beaver Town',
          org_link_url: 'google.com',
          org_link_title: 'google.com',
          mini_bio: null,
          about_us: 'Lorem IpsOn',
          species_and_habitats: 'beavers in da dam',
          issues: 'wood',
          support_us: null
        },
        {
          users_id: 2,
          org_name: 'Panda Lovers',
          org_link_url: 'google.com',
          org_link_title: 'google.com',
          mini_bio: null,
          about_us: 'Lorem IpsOn',
          species_and_habitats: 'pandas sleep on cloud 9',
          issues: 'sleep',
          support_us: null
        },
        {
          users_id: 3,
          org_name: 'Giraffe 2 Tall',
          org_link_url: 'google.com',
          org_link_title: 'google.com',
          mini_bio: null,
          about_us: 'Lorem IpsOn',
          species_and_habitats: 'the air up there',
          issues: 'too tall',
          support_us: null
        }
      ]);
    });
};
