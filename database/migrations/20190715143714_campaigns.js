exports.up = function(knex, Promise) {
  return knex.schema.createTable("campaigns", tbl => {
    tbl.increments("id");
    tbl
      .integer('users_id')
      .notNullable()
      .unsigned()
      .references('id')
      .inTable('users')
      .onDelete('RESTRICT')
      .onUpdate('CASCADE');
    tbl.string("campaign_img", 255).notNullable();
    tbl.string("campaign_name", 500).notNullable();
    tbl.text("campaign_desc", 500).notNullable();
    tbl.string("campaign_cta", 1000);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("campaigns");
};
