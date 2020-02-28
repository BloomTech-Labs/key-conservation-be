exports.up = function(knex, Promise) {
  return knex.schema.alterTable('user_reports', tbl => {
    knex.schema.hasColumn('user_reports', 'is_archived').then(exists => {
      if (!exists) tbl.boolean('is_archived').defaultTo('false');
    });
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.alterTable('user_reports', tbl => {
    tbl.dropColumn('is_archived');
  });
};
