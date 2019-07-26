exports.up = function(knex, Promise) {
  return knex.schema.createTable('campaigns', tbl => {
    tbl.increments('camp_id');
    tbl
      .integer('users_id')
      .notNullable()
      .unsigned()
      .references('id')
      .inTable('users')
      .onDelete('RESTRICT')
      .onUpdate('CASCADE');
    tbl.timestamp('created_at').defaultTo(knex.fn.now());
    tbl.string('camp_img', 255).notNullable();
    tbl.string('camp_name', 500).notNullable();
    tbl.text('camp_desc', 500).notNullable();
    tbl.string('camp_cta', 1000);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('campaigns');
};
