exports.up = function (knex, Promise) {
  return knex.schema.table('campaignUpdates', (tbl) => {
    tbl
      .integer('users_id')
      .notNullable()
      .unsigned()
      .references('id')
      .inTable('users')
      .onDelete('RESTRICT')
      .onUpdate('CASCADE');
  });
};

exports.down = function (knex, Promise) {
  return knex.schema.table('campaignUpdates', (tbl) => {
    tbl.dropColumn('users_id');
  });
};
