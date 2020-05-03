const TABLE_NAME = 'comments';
exports.up = (knex, Promise) => knex.schema.alterTable(TABLE_NAME, (table) => {
  table.renameColumn('campaign_id', 'post_id');
});

exports.down = (knex, Promise) => knex.schema.table(TABLE_NAME, (table) => {
  table.renameColumn('post_id', 'campaign_id');
});
