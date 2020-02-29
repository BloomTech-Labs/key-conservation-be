const db = require("../database/dbConfig");

function findById(id) {
  return db("application_submissions")
    .where({ id })
    .first();
}

async function findByCampId(campaign_id) {
  return db("skilled_impact_requests")
    .where({ campaign_id })
    .join(
      'application_submissions',
      'skilled_impact_requests.id',
      'application_submissions.skilled_impact_request_id'
    )
    .select(
      'application_submissions.id',
      'skilled_impact_requests.campaign_id',
      'application_submissions.skilled_impact_request_id',
      'application_submissions.user_id',
      'application_submissions.decision',
      'application_submissions.why_project',
      'application_submissions.relevant_experience'
    );
}

async function insert(submission) {
  const [id] = await db("application_submissions")
    .insert(submission)
    .returning("id");
  if (id) {
    const submission = await findById(id);
    return submission;
  }
}

async function update(decision, id) {
  const [submission_id] = await db("application_submissions")
    .where({ id })
    .update({decision})
    .returning("id");
  if (submission_id) {
    const submission = await findById(submission_id);
    return submission;
  }
}

module.exports = {
  findById,
  findByCampId,
  insert,
  update
};
