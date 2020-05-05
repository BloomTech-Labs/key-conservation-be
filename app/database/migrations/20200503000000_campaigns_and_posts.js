exports.up = (knex) => knex.schema
  .createTable('campaign_posts', (table) => {
    table.increments('id').notNullable().unique();
    table.integer('campaign_id').notNullable()
      .references('campaigns.id')
      .onUpdate('CASCADE')
      .onDelete('CASCADE');
    table.text('image').notNullable();
    table.text('description').notNullable();
    table.boolean('is_update');
    table.timestamp('created_at').defaultTo(knex.fn.now());
  })
  .then(() => knex.schema.raw('INSERT INTO campaign_posts (campaign_id, image, description, is_update, created_at) SELECT id, image, description, FALSE, created_at FROM campaigns ORDER BY id'))
  .then(() => knex.schema.raw('INSERT INTO campaign_posts (campaign_id, image, description, is_update, created_at) SELECT campaign_id, image, description, TRUE, created_at FROM campaign_updates'))
  .then(() => Promise.all([
    knex.schema.dropTable('campaign_updates'),
    knex.schema.alterTable('campaigns', (table) => {
      table.dropColumns('image', 'description');
    }),
  ]));

exports.down = (knex) => knex.schema
  .alterTable('campaigns', (table) => {
    table.text('image');
    table.text('description');
  })
  .createTable('campaign_updates', (table) => {
    table.increments('id').notNullable().unique();
    table.integer('campaign_id').notNullable()
      .references('campaigns.id')
      .onUpdate('CASCADE')
      .onDelete('CASCADE');
    table.integer('user_id').notNullable()
      .references('users.id')
      .onUpdate('CASCADE')
      .onDelete('CASCADE');
    table.text('image').notNullable()
      .defaultTo('https://static.wixstatic.com/media/62bd1e_1047458b0f524502862b0130ced09e98~mv2.gif');
    table.text('description').notNullable();
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.text('camp_name').notNullable();
  })
  .then(() => Promise.all([
    knex.schema.raw('UPDATE campaigns SET image = campaign_posts.image, description = campaign_posts.description FROM campaigns AS c JOIN campaign_posts ON c.id = campaign_posts.campaign_id WHERE campaign_posts.is_update = FALSE AND campaigns.id = campaign_posts.campaign_id'),
    knex.schema.raw('INSERT INTO campaign_updates (campaign_id, user_id, image, description, created_at, camp_name) SELECT campaign_id, user_id, campaign_posts.image, campaign_posts.description, campaign_posts.created_at, campaigns.name as camp_name FROM campaign_posts JOIN campaigns ON campaigns.id = campaign_posts.campaign_id WHERE campaign_posts.is_update = TRUE'),
  ])).then(() => knex.schema.dropTable('campaign_posts'));
