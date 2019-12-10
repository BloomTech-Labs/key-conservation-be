
exports.up = function(knex, Promise) {
    return knex.schema.table("conservationists", table => {
        table.double("longitude", 10);
        table.double("latitude", 10)
    })  
};

exports.down = function(knex, Promise) {
    return knex.schema.table("conservationists", table => {
        table.dropColumn("latitude").dropColumn("longitude");
    })
};
