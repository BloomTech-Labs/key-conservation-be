const db = require('../database/dbConfig');

async function findById(id) {
  return db('application_submissions')
    .select('*')
    .where({ id })
    .first();
}

async function findAllByCampaignId(campaign_id) {
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
    .where({ campaign_id });
}

async function insert(submission) {
  return db('application_submissions')
    .insert(submission)
    .returning('*');
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
  findAllByCampaignId,
  insert,
  update,
  updateAll,
};
