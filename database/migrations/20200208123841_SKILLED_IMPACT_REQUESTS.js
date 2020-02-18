const skills = [
    'ACCOUNTING',
    'ARCHITECTURE',
    'AUTO',
    'APP_DEVELOPMENT',
    'ART',
    'AVIATION',
    'BOATING',
    'BUSINESS_DEVELOPMENT',
    'COMMUNICATION',
    'COMMUNITY_LIAISON',
    'CONSTRUCTION',
    'CRAFT',
    'CULINARY',
    'DATA_ANALYSIS',
    'DATABASE_MANAGEMENT',
    'DIVING',
    'DRONE',
    'ELECTRICITY',
    'ENGINEERING',
    'ENTREPRENEURSHIP',
    'FINANCE',
    'FUNDRAISING',
    'GAMING',
    'GRAPHIC_DESIGN',
    'HOSPITALITY',
    'HUMAN_RESOURCES',
    'INFORMATION_TECHNOLOGY',
    'LANDSCAPE',
    'LEGAL',
    'MANAGEMENT',
    'MARKETING',
    'MEDICAL',
    'MUSICAL',
    'PHOTOGRAPHY',
    'PLUMBING',
    'PUBLIC_RELATIONS',
    'RENEWABLE_ENERGY',
    'RESEARCH',
    'SOCIAL_MEDIA',
    'STRATEGY_CONSULTING',
    'TAXI',
    'TRANSLATION',
    'VETERINARY_SERVICES',
    'VIDEOGRAPHY',
    'WEB_DESIGN',
    'WEB_DEVELOPMENT',
    'WRITING'
];
exports.up = function(knex) {
    return knex.schema.createTable('skilled_impact_requests', table => {
        table.increments('id').notNullable().unique();
        table.integer("campaign_id").notNullable()
            .references("campaigns.camp_id")
            .onDelete("CASCADE")
            .onUpdate("CASCADE");
        table.enu("skill",skills,{ useNative: true, enumName: 'enum_skills' }).notNullable();
        table.text("point_of_contact").notNullable();
        table.text("welcome_message").notNullable();
        table.text("our_contribution").notNullable();

    });
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('skilled_impact_requests');

};
