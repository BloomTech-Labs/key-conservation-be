exports.up = function(knex, Promise) {
  return knex.schema.createTable('bookmarks', tbl => {
    tbl.increments('bookmark_id');
    tbl
      .integer('users_id')
      .notNullable()
      .unsigned()
      .references('id')
      .inTable('users')
      .onDelete('CASCADE')
      .onUpdate('CASCADE');
    tbl
      .integer('camp_id')
      .notNullable()
      .unsigned()
      .references('camp_id')
      .inTable('campaigns')
      .onDelete('CASCADE')
      .onUpdate('CASCADE');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('bookmarks');
};
