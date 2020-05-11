const db = require('../dbConfig');

const CampaignPosts = require('./campaignPostsModel');
const Comments = require('./commentsModel.js');
const SkilledImpactRequests = require('./skilledImpactRequestsModel.js');
const log = require('../../logger');

async function findById(id) {
  const campaign = await db('campaigns')
    .where({ 'campaigns.id': id })
    .join('users', 'users.id', 'campaigns.user_id')
    .leftJoin('conservationists as cons', 'cons.user_id', 'campaigns.user_id')
    .where({ 'campaigns.id': id })
    .select(
      'cons.name as org_name',
      'users.profile_image',
      'users.location',
      'users.is_deactivated',
      'campaigns.*',
    )
    .first();
  if (!campaign) return campaign;
  const { image, description } = await CampaignPosts.findOriginalCampaignPostByCampaignId(id);
  campaign.image = image;
  campaign.description = description;
  campaign.updates = await CampaignPosts.findAllCampaignUpdatesByCampaignId(id);
  campaign.comments = await Comments.findCampaignComments(id);
  campaign.skilled_impact_requests = await SkilledImpactRequests.find(id);
  return campaign;
}

async function insert(campaign) {
  log.verbose(`Inserting new campaign ${campaign}`);
  try {
    const [id] = await db('campaigns')
      .insert(campaign)
      .returning('id');
    return id;
  } catch (e) {
    log.error(`Error inserting campaign: ${e}`);
  }
}

async function update(campaign, id) {
  const editedCamp = await db('campaigns').where({ id }).update(campaign);
  if (editedCamp) {
    return findById(id);
  }
}

async function remove(id) {
  const deleted = await db('campaigns').where({ id }).del();
  if (deleted) {
    return id;
  }
  return 0;
}

module.exports = {
  findById, insert, remove, update,
};
