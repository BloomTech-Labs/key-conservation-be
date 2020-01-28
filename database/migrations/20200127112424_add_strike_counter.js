
exports.up = function(knex, Promise) {
  return knex.schema.table("users", tbl => {
    tbl.integer("strikes").defaultTo(0);
  }).table("campaigns", tbl => {
    tbl.boolean("is_archived").defaultTo("false");
  }).table("campaignUpdates", tbl => {
    tbl.boolean("is_archived").defaultTo("false");
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.table("users", tbl => {
    tbl.dropColumn("strikes");
  })
};
