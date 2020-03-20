
exports.up = function (knex) {
  return knex.schema.alterTable('users', tbl => {
    tbl.boolean('accepting_help_requests').defaultTo(false).notNullable().index();
  });
};

exports.down = function (knex) {
  return knex.schema.alterTable('users', tbl => {
    tbl.dropColumn('accepting_help_requests');
  });
};
