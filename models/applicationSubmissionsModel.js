const db = require('../database/dbConfig');

async function findById(id) {
  return db('application_submissions')
<<<<<<< HEAD
    .select('*')
=======
>>>>>>> 1886a1b629b300e7828078c9e9daf53f5bc6835b
    .where({ id })
    .first();
}

<<<<<<< HEAD
async function findAllByIds(ids) {
  return db('application_submissions')
    .select('*')
    .whereIn('id', ids);
}

async function findAllByCampaignId(campaign_id) {
  return db('skilled_impact_requests')
=======
async function findAllByCampaignId(campaign_id) {
  return db('skilled_impact_requests')
    .where({ campaign_id })
>>>>>>> 1886a1b629b300e7828078c9e9daf53f5bc6835b
    .join(
      'application_submissions',
      'skilled_impact_requests.id',
      'application_submissions.skilled_impact_request_id'
    )
    .select(
      'skilled_impact_requests.campaign_id',
      'application_submissions.*'
<<<<<<< HEAD
    )
    .where({ campaign_id });
=======
    );
>>>>>>> 1886a1b629b300e7828078c9e9daf53f5bc6835b
}

async function insert(submission) {
  return db('application_submissions')
    .insert(submission)
    .returning('*');
}

async function update(id, decision) {
  return db('application_submissions')
<<<<<<< HEAD
    .update({decision})
    .where({ id })
    .returning('*');
}

async function updateAll(ids, decision) {
  return db('application_submissions')
    .update({ decision })
    .whereIn('id', ids)
    .returning('*');
=======
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
>>>>>>> 1886a1b629b300e7828078c9e9daf53f5bc6835b
}

module.exports = {
  findById,
<<<<<<< HEAD
  findAllByIds,
  findAllByCampaignId,
  insert,
  update,
  updateAll,
=======
  findAllByCampaignId,
  insert,
  update,
  acceptAndDenyAllOthers
>>>>>>> 1886a1b629b300e7828078c9e9daf53f5bc6835b
};
