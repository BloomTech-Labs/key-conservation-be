const db = require('../database/dbConfig');

const CampUpdate = require('./updateModel');

module.exports = {
  find,
  findCampaignComments,
  insert,
  update,
  remove
};

function find() {
  return db('comments');
}

function findById(id) {
  return db('comments')
    .where({ comment_id: id })
    .first();
}

function findCampaignComments(id) {
  return db('comments')
    .where({ camp_id: id })
    .join('users', 'users.id', 'comments.users_id')
    .select(`comments.*`, 'users.profile_image', 'users.username')
}

function insert(comment) {
  return db('comments')
    .insert(comment)
    .then(() => {
      return findCampaignComments(comment.camp_id);
      // return db('campaigns')
      //   .where({ camp_id: comment.camp_id })
      //   .join('users', 'users.id', 'campaigns.users_id')
      //   .select(
      //     'users.username',
      //     'users.profile_image',
      //     'users.location',
      //     'campaigns.*'
      //   )
      //   .first()
      //   .then(campaign => {
      //     return CampUpdate.findUpdatesByCamp(comment.camp_id)
      //       .then(updates => {
      //         campaign.updates = updates;
      //         return campaign;
      //       })
      //       .then(campaign => {
      //         return findCampaignComments(comment.camp_id)
      //           .then(comments => {
      //             campaign.comments = comments;
      //             return campaign;
      //           })
      //           .then(campaign => {
      //             return campaign;
      //           });
      //       });
      //   });
    });
}
// Possible circular dependency issue prevented me from simply calling findById from campignModel.js in the above function
// Commented out for now, while I investigate issues on the dev server

function update(id, changes) {
  return db('comments')
    .where({ comment_id: id })
    .update(changes)
    .then(() => {
      return findById(id);
    });
}

function remove(id) {
  return db('comments')
    .where({ comment_id: id })
    .del()
    .then(() => {
      return id;
    });
}
