exports.up = function(knex, Promise) {
  return knex.schema.createTable('users', tbl => {
    tbl.increments('id');
    tbl
      .string('username', 30)
      .notNullable()
      .unique();
    tbl.string('email', 100).notNullable();
    tbl
      .string('profile_image', 500)
      .defaultTo(
        'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'
      );
    tbl.timestamp('created_at').defaultTo(knex.fn.now());
    tbl.string('location', 250).notNullable();
    tbl.string('twitter', 150);
    tbl.string('facebook', 150);
    tbl.string('instagram', 150);
    tbl.string('phone_number', 50);
    tbl.string('roles', 50).notNullable();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('users');
};
