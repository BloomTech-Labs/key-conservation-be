exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('connections')
    .del()
    .then(() => {
      // Inserts seed entries
      return knex('connections').insert([
        {
          connection_id: '1',
          connector_id: '22',
          connected_id: '32'
        },
        {
          connection_id: '2',
          connector_id: '22',
          connected_id: '59'
        },
        {
          connection_id: '3',
          connector_id: '3',
          connected_id: '100'
        },
        {
          connection_id: '4',
          connector_id: '56',
          connected_id: '200'
        }
      ]);
    });
};
