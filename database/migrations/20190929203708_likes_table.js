exports.up = function(knex, Promise) {
  return knex.schema.createTable('likes', tbl => {
    tbl.increments('like_id');
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
      .unsigned()
      .references('camp_id')
      .inTable('campaigns')
      .onDelete('CASCADE')
      .onUpdate('CASCADE');
    tbl
      .integer('update_id')
      .unsigned()
      .references('update_id')
      .inTable('campaignUpdates')
      .onDelete('CASCADE')
      .onUpdate('CASCADE');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('likes');
};
