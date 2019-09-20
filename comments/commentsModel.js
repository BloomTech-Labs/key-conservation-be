const db = require('../database/dbConfig');
const CampaignModel = require('../campaigns/campModel');

module.exports = {
  find,
  findCampaignComments,
  insert
};

function find() {
  return db('comments');
}

function findCampaignComments(id) {
  return CampaignModel.findCampaignWithComments(id).then(campaign => {
    return db('comments')
      .where({ camp_id: id })
      .then(comments => {
        campaign.comments = comments;
        return campaign;
      });
  });
}

function insert(comment) {
  return db('comments').insert(comment);
}

function update(comment) {}

function remove() {}
