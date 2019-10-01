exports.up = function(knex, Promise) {
  return knex.schema.table('campaigns', tbl => {
      tbl.text('urgency')
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.table('campains', tbl => {
      tbl.dropColumn('urgency')
  })
};
