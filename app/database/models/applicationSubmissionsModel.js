const db = require('../dbConfig');

async function findById(id) {
  return db('application_submissions')
    .select('*')
    .where({ id })
    .first();
}

async function findAllByIds(ids) {
  return db('application_submissions')
    .select('id')
    .whereIn('id', ids);
}

async function findSubmissionsByUser(userId) {
  return db('application_submissions')
    .join(
      'skilled_impact_requests',
      'skilled_impact_requests.id',
      'application_submissions.skilled_impact_request_id',
    )
    .join(
      'campaigns',
      'campaigns.id',
      'skilled_impact_requests.campaign_id',
    )
    .join(
      'users',
      'users.id',
      'campaigns.user_id'
    )
    .select(
      'campaigns.name',
      'campaigns.created_at',
      'application_submissions.*',
      'skilled_impact_requests.id',
      'skilled_impact_requests.skill',
      'skilled_impact_requests.campaign_id',
      'users.profile_image'
    )
    .where({ 'application_submissions.user_id': userId });
}

async function findAllByCampaignId(id) {
  return db('skilled_impact_requests')
    .join(
      'application_submissions',
      'skilled_impact_requests.id',
      'application_submissions.skilled_impact_request_id',
    )
    .select(
      'skilled_impact_requests.campaign_id',
      'application_submissions.*',
    )
    .where({ campaign_id: id });
}

async function insert(submission) {
  return db('application_submissions').insert(submission).returning('*');
}

async function update(id, decision) {
  return db('application_submissions')
    .update({ decision })
    .where({ id })
    .returning('*');
}

async function updateAll(ids, decision) {
  return db('application_submissions')
    .update({ decision })
    .whereIn('id', ids)
    .returning('*');
}

module.exports = {
  findById,
  findAllByIds,
  findSubmissionsByUser,
  findAllByCampaignId,
  insert,
  update,
  updateAll,
};
