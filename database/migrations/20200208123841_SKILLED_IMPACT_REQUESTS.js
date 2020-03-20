exports.up = function (knex) {
  return knex.schema.createTable('skilled_impact_requests', (table) => {
    table.increments('id').notNullable().unique();
    table.integer('campaign_id').notNullable()
      .references('campaigns.camp_id')
      .onDelete('CASCADE')
      .onUpdate('CASCADE');
    table.enum('skill', null, { useNative: true, enumName: 'enum_skills', existingType: true }).notNullable();
    table.text('point_of_contact').notNullable();
    table.text('welcome_message').notNullable();
    table.text('our_contribution').notNullable();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('skilled_impact_requests');
};
