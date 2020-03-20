exports.up = function (knex, Promise) {
  return knex.schema
    .table('users', tbl => {
      tbl.integer('strikes').defaultTo(0);
    });
};

exports.down = function (knex, Promise) {
  return knex.schema.table('users', tbl => {
    tbl.dropColumn('strikes');
  });
};
