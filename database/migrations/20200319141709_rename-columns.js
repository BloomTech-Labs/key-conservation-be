
exports.up = function (knex) {
  return knex.schema.alterTable('conservationists', (tbl) => {
    tbl.renameColumn('cons_id', 'id');
    tbl.renameColumn('users_id', 'user_id');
    tbl.renameColumn('org_name', 'name');
    tbl.renameColumn('org_link_url', 'link_url');
    tbl.renameColumn('org_link_text', 'link_text');
    tbl.renameColumn('org_cta', 'call_to_action');
  })
    .alterTable('supporters', (tbl) => {
      tbl.renameColumn('sup_id', 'id');
      tbl.renameColumn('users_id', 'user_id');
      tbl.renameColumn('sup_name', 'name');
    })
    .alterTable('campaigns', (tbl) => {
      tbl.renameColumn('camp_id', 'id');
      tbl.renameColumn('users_id', 'user_id');
      tbl.renameColumn('camp_img', 'image');
      tbl.renameColumn('camp_name', 'name');
      tbl.renameColumn('camp_desc', 'description');
      tbl.renameColumn('camp_cta', 'call_to_action');
    })
    .alterTable('campaign_updates', (tbl) => {
      tbl.renameColumn('update_id', 'id');
      tbl.renameColumn('users_id', 'user_id');
      tbl.renameColumn('update_img', 'image');
      tbl.renameColumn('update_desc', 'description');
    })
    .alterTable('comments', (tbl) => {
      tbl.renameColumn('comment_id', 'id');
      tbl.renameColumn('users_id', 'user_id');
      tbl.renameColumn('camp_id', 'campaign_id');
      tbl.renameColumn('comment_body', 'body');
    })
    .alterTable('bookmarks', (tbl) => {
      tbl.renameColumn('bookmark_id', 'id');
      tbl.renameColumn('users_id', 'user_id');
      tbl.renameColumn('camp_id', 'campaign_id');
    })
    .alterTable('user_reports', (tbl) => {
      tbl.renameColumn('report_desc', 'description');
    })
    .alterTable('connections', (tbl) => {
      tbl.renameColumn('connection_id', 'id');
    });
};

exports.down = function (knex) {
  return knex.schema.alterTable('conservationists', (tbl) => {
    tbl.renameColumn('id', 'cons_id');
    tbl.renameColumn('user_id', 'users_id');
    tbl.renameColumn('name', 'org_name');
    tbl.renameColumn('link_url', 'org_link_url');
    tbl.renameColumn('link_text', 'org_link_text');
    tbl.renameColumn('call_to_action', 'org_cta');
  })
    .alterTable('supporters', (tbl) => {
      tbl.renameColumn('id', 'sup_id');
      tbl.renameColumn('user_id', 'users_id');
      tbl.renameColumn('name', 'sup_name');
    })
    .alterTable('campaigns', (tbl) => {
      tbl.renameColumn('id', 'camp_id');
      tbl.renameColumn('user_id', 'users_id');
      tbl.renameColumn('image', 'camp_img');
      tbl.renameColumn('name', 'camp_name');
      tbl.renameColumn('description', 'camp_desc');
      tbl.renameColumn('call_to_action', 'camp_cta');
    })
    .alterTable('campaign_updates', (tbl) => {
      tbl.renameColumn('id', 'update_id');
      tbl.renameColumn('user_id', 'users_id');
      tbl.renameColumn('image', 'update_img');
      tbl.renameColumn('description', 'update_desc');
    })
    .alterTable('comments', (tbl) => {
      tbl.renameColumn('id', 'comment_id');
      tbl.renameColumn('user_id', 'users_id');
      tbl.renameColumn('campaign_id', 'camp_id');
      tbl.renameColumn('body', 'comment_body');
    })
    .alterTable('bookmarks', (tbl) => {
      tbl.renameColumn('id', 'bookmark_id');
      tbl.renameColumn('user_id', 'users_id');
      tbl.renameColumn('campaign_id', 'camp_id');
    })
    .alterTable('user_reports', (tbl) => {
      tbl.renameColumn('description', 'report_desc');
    })
    .alterTable('connections', (tbl) => {
      tbl.renameColumn('id', 'connection_id');
    });
};
