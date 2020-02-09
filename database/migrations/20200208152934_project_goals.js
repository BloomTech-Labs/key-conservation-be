
exports.up = function(knex) {
    return knex.schema.createTable('project_goals', table => {
        table.increments('id').notNullable().unique();
        table.string("goal_title").notNullable();
        table.text("description").notNullable();
        table.integer("skilled_impact_request_id").notNullable()
            .references("id")
            .inTable("skilled_impact_requests")
            .onDelete("CASCADE")
            .onUpdate("CASCADE");

    });
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('project_goals');

};
