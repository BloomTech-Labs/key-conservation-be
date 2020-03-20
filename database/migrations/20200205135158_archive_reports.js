exports.up = function (knex, Promise) {
  return knex.schema.alterTable('user_reports', tbl => {
    tbl.boolean('is_archived').defaultTo('false');
  });
};

exports.down = function (knex, Promise) {
  return knex.schema.alterTable('user_reports', tbl => {
    // tbl.dropColumn('is_archived');
  });
};
