exports.up = function (knex) {
  return knex.schema.table('users', tbl => {
    tbl.boolean('admin').defaultTo(false);
    tbl.boolean('is_deactivated').defaultTo(false);
    tbl.timestamp('deactivated_at');
  });
};

exports.down = async function (knex) {
  const hasColumn = await knex.schema.hasColumn('users', 'admin');
  return knex.schema.table('users', tbl => {
    if (hasColumn) {
      tbl
        .dropColumn('admin')
        .dropColumn('is_deactivated')
        .dropColumn('deactivated_at');
    }
  });
};
