exports.up = function(knex, Promise) {
  return knex.schema.table('campaignUpdates', tbl => {
    tbl
      .string('camp_name')
      .notNullable()
      .references('camp_name')
      .inTable('campaigns')
      .onDelete('CASCADE');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.table('campaignUpdates', tbl => {
    tbl.dropColumn('camp_name');
  });
};
