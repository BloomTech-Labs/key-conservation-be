exports.up = function(knex, Promise) {
  return knex.schema.createTable('supporters', tbl => {
    tbl.increments('sup_id');
    tbl
      .integer('users_id')
      .notNullable()
      .unsigned()
      .references('id')
      .inTable('users')
      .onDelete('RESTRICT')
      .onUpdate('CASCADE');
    tbl.string('sup_name', 50);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('supporters');
};
