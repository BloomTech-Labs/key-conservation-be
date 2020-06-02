exports.up = function (knex, Promise) {
  return knex.schema.table('skills', (tbl) => {
    tbl
      .text('description')
      .nullable()
  });
};

exports.down = function (knex, Promise) {
  return knex.schema.table('skills', (tbl) => {
    tbl.dropColumn('description');
  });
};