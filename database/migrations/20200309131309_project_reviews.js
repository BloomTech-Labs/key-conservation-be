
exports.up = function(knex) {
    return knex.schema.createTable('project_reviews', table => {
        table.increments('id').notNullable().unique();
        table.integer("recommendation").notNullable();
        table.integer("communication").notNullable();
        table.integer("experience").notNullable();
        table.text("review_description").notNullable();
        table.integer("supporter_id")
            .notNullable()
            .references("supporters.sup_id")
            .onDelete("CASCADE")
            .onUpdate("CASCADE"); 
        table.integer("conservationist_id")
            .notNullable()
            .references("conservationists.cons_id")
            .onDelete("CASCADE")
            .onUpdate("CASCADE");   
        table.integer("skilled_impact_request_id").notNullable()
            .references("skilled_impact_requests.id")
            .onDelete("CASCADE")
            .onUpdate("CASCADE"); 
    });
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('project_reviews');
};
