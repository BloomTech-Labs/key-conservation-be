exports.up = function (knex, Promise) {
    return knex.schema.createTable('notifications', (tbl) => {
      tbl.increments('notification_id');
      tbl.integer('notification_type');
      tbl.integer('sender_id')
        .notNullable();
      tbl.string('sender_name', 100);
      tbl.string('sender_pic', 100);
      tbl.integer('user_id')
        .notNullable();
      tbl.timestamp('time').defaultTo(knex.fn.now());
      tbl.string('pathway', 100);
      tbl.boolean('new_notification').defaultTo(true);
    });
  };
  
  exports.down = function (knex, Promise) {
    return knex.schema.dropTableIfExists('notifications');
  };
  