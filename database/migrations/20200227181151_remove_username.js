exports.up = function (knex, Promise) {
  return knex.schema.alterTable('users', tbl => {
    tbl.dropColumn('username');
  }).alterTable('conservationists', tbl => {
    tbl.string('org_name', 48).notNullable().alter();
  }).alterTable('supporters', tbl => {
    tbl.string('sup_name', 48).notNullable().alter();
  });
};

exports.down = function (knex, Promise) {
  return knex.schema.table('users', tbl => {
    tbl
      .string('username', 30)
      .notNullable()
      .unique();
  }).alterTable('conservationists', tbl => {
    tbl.string('org_name', 50).alter();
  }).alterTable('supporters', tbl => {
    tbl.string('sup_name', 50).alter();
  });
};
