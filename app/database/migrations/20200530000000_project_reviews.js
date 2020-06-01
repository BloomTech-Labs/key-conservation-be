
exports.up = function(knex) {
    return knex.schema.createTable('project_reviews', table => {
        table.increments('id').notNullable().unique();
        table.text("review").notNullable();
        table.integer("likely_to_recommend").notNullable();
        table.integer("supporter_communication").notNullable();
        table.integer("provided_value").notNullable();
        table.integer("supporter_user_id")
            .references("supporters.id")
            .onDelete("CASCADE")
            .onUpdate("CASCADE"); 
        table.integer("conservationist_user_id")
            .notNullable()
            .references("conservationists.id")
            .onDelete("CASCADE")
            .onUpdate("CASCADE");   
        table.integer("skilled_impact_request_id")
            .references("skilled_impact_requests.id")
            .onDelete("CASCADE")
            .onUpdate("CASCADE"); 
    });
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('project_reviews');
};
