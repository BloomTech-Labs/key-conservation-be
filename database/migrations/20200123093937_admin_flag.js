
exports.up = function(knex) {
  knex.schema.table('users', tbl => {
    tbl.boolean('admin').defaultTo(false);
    tbl.boolean('is_deactivated').defaultTo(false);
    tbl.timestamp('deactivated_at');
  })
};

exports.down = function(knex) {
  knex.schema.table('users', tbl => {
    tbl.dropColumn('admin')
       .dropColumn('is_deactivated')
       .dropColumn('deactivated_at');
  })
};
