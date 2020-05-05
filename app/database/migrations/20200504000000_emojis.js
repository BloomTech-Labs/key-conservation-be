exports.up = function (knex) {
  return knex.schema.createTable('emojis', (table) => {
    table.increments('id');
    // Which table can this post be found in?
    table.bool('is_comment').notNullable();
    // ID of post
    table.integer('post_id').notNullable();
    // User ID (Person who reacted)
    table
      .integer('user_id')
      .notNullable()
      .unsigned()
      .references('id')
      .inTable('users')
      .onDelete('CASCADE');
    // The actual emoji
    table.string('emoji').notNullable();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('emojis');
};
