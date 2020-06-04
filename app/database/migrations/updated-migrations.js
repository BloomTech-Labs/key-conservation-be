const decisions = ['ACCEPTED', 'PENDING', 'DENIED'];

exports.up = (knex, Promise) => knex.schema

  .createTable('users', (tbl) => { // DONE
    tbl.increments('id');
    tbl.string('sub').notNullable().unique();
    tbl.string('email', 100).notNullable();
    tbl.string('profile_image', 500)
      .defaultTo(
        'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'
      );
    tbl.timestamp('created_at').defaultTo(knex.fn.now());
    tbl.string('location', 250);
    tbl.string('mini_bio', 280);
    tbl.text('species_and_habitats', 1000);
    tbl.string('twitter', 150);
    tbl.string('facebook', 150);
    tbl.string('instagram', 150);
    tbl.string('phone_number', 50);
    tbl.string('roles', 50).notNullable();
    tbl.boolean('admin').defaultTo(false);
    tbl.boolean('is_deactivated').defaultTo(false);
    tbl.timestamp('deactivated_at');
    tbl.integer('strikes').defaultTo(0);
    tbl.string('full_text_weighted', 150);
    tbl.boolean('accepting_help_requests')
      .defaultTo(false).notNullable().index();
  })
  .createTable('conservationists', (tbl) => { // DONE
    tbl.increments('id');
    tbl.integer('user_id').notNullable().unsigned().references('users.id')
      .onDelete('RESTRICT').onUpdate('CASCADE');
    tbl.string('name', 50);
    tbl.string('link_url', 500);
    tbl.string('link_text', 50);
    tbl.string('call_to_action', 500);
    tbl.text('about_us', 1000);
    tbl.text('issues', 1000);
    tbl.text('support_us', 1000);
    tbl.string('city', 150);
    tbl.string('country', 100);
    tbl.string('point_of_contact_name', 100);
    tbl.string('point_of_contact_email', 150);
    tbl.double('longitude', 17);
    tbl.double('latitude', 17);
  })

  .createTable('campaigns', (tbl) => { // DONE
    tbl.increments('id');
    tbl.integer('user_id').notNullable().unsigned().references('users.id')
      .onDelete('RESTRICT').onUpdate('CASCADE');
    tbl.timestamp('created_at').defaultTo(knex.fn.now());
    tbl.string('image', 255).notNullable()
      .defaultTo('https://static.wixstatic.com/media/62bd1e_1047458b0f524502862b0130ced09e98~mv2.gif');
    tbl.string('name', 500).notNullable();
    tbl.text('description', 500);
    tbl.string('call_to_action', 1000);
    tbl.text('urgency');
  })

  .createTable('campaign_posts', (tbl) => { // DONE
    tbl.increments('id').notNullable().unique();
    tbl.integer('campaign_id').notNullable()
      .references('campaigns.id').onUpdate('CASCADE')
      .onDelete('CASCADE');
    tbl.text('image').notNullable();
    tbl.text('description').notNullable();
    tbl.boolean('is_update');
    tbl.timestamp('created_at').defaultTo(knex.fn.now());
  })

  .createTable('supporters', (tbl) => { // DONE
    tbl.increments('id');
    tbl.integer('user_id').notNullable()
      .unsigned().references('users.id')
      .onDelete('RESTRICT').onUpdate('CASCADE');
    tbl.string('name', 50);
  })

  .createTable('comments', (tbl) => { // DONE
    tbl.increments('id');
    tbl.integer('user_id').notNullable()
      .unsigned().references('users.id')
      .onDelete('CASCADE').onUpdate('CASCADE');
    tbl.integer('campaign_id').notNullable()
      .unsigned().references('campaigns.id')
      .onDelete('CASCADE').onUpdate('CASCADE');
    tbl.timestamp('created_at').defaultTo(knex.fn.now());
    tbl.text('body', 500).notNullable();
  })
  .createTable('bookmarks', (tbl) => { // DONE
    tbl.increments('id');
    tbl.integer('user_id').notNullable()
      .unsigned().references('users.id')
      .onDelete('CASCADE').onUpdate('CASCADE');
    tbl.integer('campaign_id').notNullable()
      .unsigned().references('campaigns.id')
      .onDelete('CASCADE').onUpdate('CASCADE');
  })
  .createTable('user_reports', (tbl) => { // DONE
    tbl.increments('id');
    tbl.integer('reported_by').notNullable()
      .unsigned().references('users.id').onDelete('RESTRICT');
    tbl.integer('reported_user').notNullable()
      .references('users.id').onDelete('RESTRICT');
    tbl.integer('post_id').unsigned();
    tbl.string('table_name');
    tbl.string('description');
    tbl.timestamp('reported_at').defaultTo(knex.fn.now());
    tbl.boolean('is_archived').defaultTo('false');
  })
  .createTable('skill_enum', (tbl) => { // DONE
    tbl.string('skill').primary();
  })
  .createTable('skills', (tbl) => { // DONE
    tbl.increments('id');
    tbl.integer('user_id').unsigned().references('users.id').notNullable().index();
    tbl.enum('skill', skills, { useNative: true, enumName: 'enum_skills' }).notNullable().index();
    tbl.unique(['user_id', 'skill']);
  })
  .createTable('skilled_impact_requests', (tbl) => { // DONE
    tbl.increments('id').notNullable().unique();
    tbl.integer('campaign_id').notNullable()
      .references('campaigns.id').onDelete('CASCADE')
      .onUpdate('CASCADE');
    tbl.enum('skill', null, { useNative: true, enumName: 'enum_skills', existingType: true }).notNullable();
    tbl.text('point_of_contact').notNullable();
    tbl.text('welcome_message').notNullable();
    tbl.text('our_contribution').notNullable();
  })
  .createTable('project_goals', (tbl) => { // DONE
    tbl.increments('id').notNullable().unique();
    tbl.string('goal_title').notNullable();
    tbl.text('description').notNullable();
    tbl.integer('skilled_impact_request_id').notNullable()
      .references('skilled_impact_requests.id')
      .onDelete('CASCADE').onUpdate('CASCADE');
  })
  .createTable('application_submissions', (tbl) => { // DONE
    tbl.increments('id');
    tbl.integer('skilled_impact_request_id')
      .references('skilled_impact_requests.id')
      .notNullable().unsigned()
      .onDelete('RESTRICT').onUpdate('CASCADE');
    tbl.integer('user_id').references('users.id')
      .notNullable().unsigned().onDelete('RESTRICT')
      .onUpdate('CASCADE');
    tbl.enum('decision', decisions, { useNative: true, enumName: 'enum_decisions' })
      .defaultTo('PENDING').notNullable();
    tbl.text('why_project');
    tbl.text('relevant_experience');
  })
  .createTable('connections', (tbl) => { // DONE
    tbl.increments('connection_id');
    tbl.integer('connector_id').unsigned()
      .notNullable().references('users.id')
      .onUpdate('CASCADE').onDelete('CASCADE');
    tbl.integer('connected_id').unsigned()
      .notNullable().references('users.id')
      .onUpdate('CASCADE').onDelete('CASCADE');
    tbl.string('status', 50);
  })
  .createTable('emojis', (tbl) => { // DONE?
    tbl.increments('id');
    tbl.bool('is_comment').notNullable();
    tbl.integer('post_id').notNullable();
    tbl.integer('user_id').notNullable()
      .unsigned().references('users.id')
      .onDelete('CASCADE');
    tbl.string('emoji').notNullable();
  })
  .createTable('notifications', (tbl) => { // DONE
    tbl.increments('notification_id');
    tbl.integer('notification_type');
    tbl.integer('sender_id').notNullable()
      .unsigned().references('users.id')
      .onDelete('CASCADE');
    tbl.string('sender_name', 100);
    tbl.string('sender_pic', 100);
    tbl.integer('user_id').notNullable()
      .unsigned().references('users.id')
      .onDelete('CASCADE');
    tbl.timestamp('time').defaultTo(knex.fn.now());
    tbl.string('pathway', 100);
    tbl.boolean('new_notification').defaultTo(true);
  })
  .then(() => knex('skill_enum').insert(skills.map((skill) => ({ skill }))))
  .then(() => knex.schema.alterTable('skills', (tbl) => {
    tbl.string('skill').notNullable().references('skill_enum.skill').alter();
  }))
  .then(() =>
    knex.schema.alterTable('skilled_impact_requests', (tbl) => {
      tbl.string('skill').notNullable().references('skill_enum.skill')
        .alter();
    })
  ).then(() => knex.raw('DROP TYPE enum_skills'));

exports.down = function (knex, Promise) {

  return knex.schema
    .dropTableIfExists('notifications')
    .dropTableIfExists('emojis')
    .dropTableIfExists('connections')
    .dropTableIfExists('application_submissions')
    .dropTableIfExists('project_goals')
    .dropTableIfExists('skilled_impact_requests')
    .dropTableIfExists('skills')
    .dropTableIfExists('skill_enum')
    .dropTableIfExists('user_reports')
    .dropTableIfExists('bookmarks')
    .dropTableIfExists('comments')
    .dropTableIfExists('supporters')
    .dropTableIfExists('campaigns')
    .dropTableIfExists('conservationists')
    .dropTableIfExists('users')

};

const skills = [
  'ACCOUNTING',
  'ARCHITECTURE',
  'AUTO',
  'APP_DEVELOPMENT',
  'ART',
  'AVIATION',
  'BOATING',
  'BUSINESS_DEVELOPMENT',
  'CAMERA_TRAPS',
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
  'SENSORS',
  'SOCIAL_MEDIA',
  'STRATEGY_CONSULTING',
  'TAXI',
  'TRANSLATION',
  'VETERINARY_SERVICES',
  'VIDEOGRAPHY',
  'WEB_DESIGN',
  'WEB_DEVELOPMENT',
  'WRITING',
];
