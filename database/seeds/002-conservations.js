exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('conservationists')
    .del()
    .then(function() {
      // Inserts seed entries
      return knex('conservationists').insert([
        {
          id: 1,
          org_name: 'Beaver Town',
          org_link: 'google.com',
          about_us: 'Lorem IpsOn',
          species: 'beavers',
          habitats: 'da dam',
          issues: 'wood'
        },
        {
          id: 2,
          org_name: 'Panda Lovers',
          org_link: 'google.com',
          about_us: 'Lorem IpsOn',
          species: 'pandas',
          habitats: 'forest',
          issues: 'sleep'
        },
        {
          id: 3,
          org_name: 'Giraffe 2 Tall',
          org_link: 'google.com',
          about_us: 'Lorem IpsOn',
          species: 'giraffes',
          habitats: 'savannah',
          issues: 'too tall'
        }
      ]);
    });
};
