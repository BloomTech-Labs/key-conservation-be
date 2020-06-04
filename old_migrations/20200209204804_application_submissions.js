const decisions = ['ACCEPTED', 'PENDING', 'DENIED'];

exports.up = function (knex) {
  return knex.schema.createTable('application_submissions', (table) => {
    table.increments('id');
    table
      .integer('skilled_impact_request_id')
      .references('skilled_impact_requests.id')
      .notNullable()
      .unsigned()
      .onDelete('RESTRICT')
      .onUpdate('CASCADE');
    table
      .integer('user_id')
      .references('users.id')
      .notNullable()
      .unsigned()
      .onDelete('RESTRICT')
      .onUpdate('CASCADE');
    table
      .enum('decision', decisions, { useNative: true, enumName: 'enum_decisionsa' })
      .defaultTo('PENDING')
      .notNullable();
    table.text('why_project');
    table.text('relevant_experience');
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('application_submissions');
};
