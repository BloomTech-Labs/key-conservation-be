
exports.up = function(knex, Promise) {
  return knex.schema.table("conservationists", table => {
      table.string("city", 150);
      table.string("country", 100);
      table.string("point_of_contact_name", 100);
      table.string("point_of_contact_email", 150);
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.table("conservationists", table => {
      table.dropColumn("point_of_contact_email").dropColumn("point_of_contact_name").dropColumn("country").dropColumn("city");
  })
};
