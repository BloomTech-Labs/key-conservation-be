exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('connections')
    .del()
    .then(() => {
      // Inserts seed entries
      return knex('connections').insert([
        {
          connector_id: 22,
          connected_id: 32
        },
        {
          connector_id: 22,
          connected_id: 59
        },
        {
          connector_id: 3,
          connected_id: 100
        },
        {
          connector_id: 56,
          connected_id: 200
        }
      ]);
    });
};
