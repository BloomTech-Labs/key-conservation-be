
exports.seed = function (knex, Promise) {
  return knex('supporters')
    .del()
    .then(() => knex('supporters').insert([
      {
        name: 'Albert',
        user_id: 1,
      },
      {
        name: 'Frank',
        user_id: 2,
      },
      {
        name: 'Jessica',
        user_id: 3,
      },
    ]));
};
