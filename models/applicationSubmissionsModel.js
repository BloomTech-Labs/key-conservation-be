const db = require('../database/dbConfig');

async function findById(id) {
  return db('application_submissions')
    .where({ id })
    .first();
}

async function findAllByCampaignId(campaign_id) {
  return db('skilled_impact_requests')
    .where({ campaign_id })
    .join(
      'application_submissions',
      'skilled_impact_requests.id',
      'application_submissions.skilled_impact_request_id'
    )
    .select(
      'skilled_impact_requests.campaign_id',
      'application_submissions.*'
    );
}

async function insert(submission) {
  return db('application_submissions')
    .insert(submission)
    .returning('*');
}

async function update(id, decision) {
  return db('application_submissions')
    .where({ id })
    .update({decision})
    .returning('*');
}

async function acceptAndDenyAllOthers(id, skilled_impact_request_id) {
  await db.transaction(transaction => {
    db('application_submissions')
      .where({ id })
      .update({ decision : 'ACCEPTED' })
      .transacting(transaction)
      .then(async () => {
        await db('application_submissions')
          .where({ skilled_impact_request_id })
          .where('id', '<>', id)
          .update({ decision: 'DENIED' })
          .transacting(transaction);
      })
      .then(transaction.commit)
      .catch(transaction.rollback);
  })
  
  return findById(id);
}

module.exports = {
  findById,
  findAllByCampaignId,
  insert,
  update,
  acceptAndDenyAllOthers
};
