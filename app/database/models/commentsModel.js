const db = require('../dbConfig');

function find() {
  return db('comments');
}

function findById(id) {
  return db('comments')
    .where({ id })
    .first();
}

async function findCampaignComments(id) {
  const comments = await db('comments')
    .join('users', 'users.id', 'comments.user_id')
    .leftJoin('conservationists as cons', 'cons.user_id', 'users.id')
    .leftJoin('supporters as sup', 'sup.user_id', 'users.id')
    .where({ 'comments.campaign_id': id, 'users.is_deactivated': false })
    .orderBy('comments.created_at', 'asc')
    .select(
      'comments.*',
      'users.profile_image',
      'cons.name as org_name',
      'sup.name as sup_name',
      'users.is_deactivated',
    );
  return comments.map((c) => ({ ...c, name: c.org_name || c.sup_name || 'User' }));
}

async function insert(comment) {
  await db('comments')
    .insert(comment);
  return findCampaignComments(comment.campaign_id);
}

async function update(id, changes) {
  await db('comments')
    .where({ id })
    .update(changes);
  return findById(id);
}

async function remove(id) {
  await db('comments')
    .where({ id })
    .del();
  return id;
}

module.exports = {
  find, findById, findCampaignComments, insert, update, remove,
};
