exports.up = function (knex, Promise) {
  return knex.schema.table('connections', (tbl) => {
    tbl.renameColumn('accepted', 'status');
  });
};

exports.down = function (knex, Promise) {
  return knex.schema.table('connections', (tbl) => {
    tbl.renameColumn('status', 'accepted');
  });
};
