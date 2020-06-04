exports.up = function (knex, Promise) {
  return knex.schema.table('campaign_updates', (tbl) => {
    tbl
      .string('camp_name')
      .notNullable();
  });
};

exports.down = function (knex, Promise) {
  return knex.schema.table('campaign_updates', (tbl) => {
    tbl.dropColumn('camp_name');
  });
};
