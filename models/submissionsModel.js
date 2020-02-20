const db = require("../database/dbConfig");

function findById(id) {
  return db("application_submissions")
    .where({ id })
    .first();
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
  insert,
  update
};
