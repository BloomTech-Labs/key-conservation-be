exports.up = function (knex, Promise) {
  return knex.schema.createTable('campaign_updates', (tbl) => {
    tbl.increments('update_id');
    tbl
      .integer('camp_id')
      .notNullable()
      .unsigned()
      .references('camp_id')
      .inTable('campaigns')
      .onDelete('CASCADE')
      .onUpdate('CASCADE');
    tbl.timestamp('created_at').defaultTo(knex.fn.now());
    tbl
      .string('update_img', 255)
      .notNullable()
      .defaultTo(
        'https://static.wixstatic.com/media/62bd1e_1047458b0f524502862b0130ced09e98~mv2.gif',
      );
    tbl.string('update_desc', 500).notNullable();
  });
};

exports.down = function (knex, Promise) {
  return knex.schema.dropTableIfExists('campaignUpdates');
};
