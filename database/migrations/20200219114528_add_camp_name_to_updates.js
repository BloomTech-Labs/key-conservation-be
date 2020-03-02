exports.up = function(knex, Promise) {
  return knex.schema.table('campaignUpdates', tbl => {
    tbl
      .string('camp_name')
      .notNullable();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.table('campaignUpdates', tbl => {
    tbl.dropColumn('camp_name');
  });
};
