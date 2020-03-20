exports.up = function (knex, Promise) {
  return knex.schema.table('connections', (tbl) => {
    tbl.string('accepted', 50);
  });
};

exports.down = function (knex, Promise) {
  return knex.schema.table('connections', (tbl) => {
    tbl.dropColumn('accepted');
  });
};
