exports.up = function(knex, Promise) {
  return knex.schema.table('conservationists', table => {
    table.renameColumn('about_us', 'mission');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.table('conservationists', table => {
    table.dropColumn('mission');
  });
};
