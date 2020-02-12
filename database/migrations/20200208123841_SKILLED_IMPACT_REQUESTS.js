let skills = [
    "Accounting",
    "Architecture",
    "Auto",
    "App Development",
    "Art",
    "Aviation",
    "Boating",
    "Business Development",
    "Communication",
    "Community Liaison",
    "Construction",
    "Craft",
    "Culinary",
    "Data Analysis",
    "Database Management",
    "Diving",
    "Drone",
    "Electricity",
    "Engineering",
    "Entrepreneurship",
    "Finance",
    "Fundraising",
    "Gaming",
    "Graphic Design",
    "Hospitality",
    "Human Resources",
    "Information Technology",
    "Landscape",
    "Legal",
    "Management",
    "Marketing",
    "Medical",
    "Musical",
    "Photography",
    "Plumbing",
    "Public Relations",
    "Renewable Energy",
    "Research",
    "Social Media",
    "Strategy Consulting",
    "Taxi",
    "Translation",
    "Veterinary Services",
    "Videography",
    "Web Design",
    "Web Development",
    "Writing"];

exports.up = function(knex) {
    return knex.schema.createTable('skilled_impact_requests', table => {
        table.increments('id').notNullable().unique();
        table.integer("campaign_id").notNullable()
            .references("campaigns.camp_id")
            .onDelete("CASCADE")
            .onUpdate("CASCADE");
        table.enu("skills",skills,{ useNative: true, enumName: 'enum_skills' }).notNullable();
        table.text("point_of_contact").notNullable();
        table.text("welcome_message").notNullable();
        table.text("our_contribution").notNullable();

    });
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('skilled_impact_requests');

};
