exports.up = function(knex) {
  return knex.schema.createTable("application_submissions", function(table) {
    table.increments("id");
    table
      .integer("skilled_impact_request_id")
      .references("id")
      .inTable("skilled_impact_requests")
      .notNullable()
      .unsigned()
      .onDelete("RESTRICT")
      .onUpdate("CASCADE");
    table
      .integer("user_id")
      .references("id")
      .inTable("users")
      .notNullable()
      .unsigned()
      .onDelete("RESTRICT")
      .onUpdate("CASCADE");
    table.enu("decision", ["ACCEPTED", "PENDING", "DENIED"]).defaultTo("PENDING");
    table.string("why_project", 2000);
    table.string("relevant_experience", 2000);
  });
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('application_submissions');
};
