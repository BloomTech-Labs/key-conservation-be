const db = require('../dbConfig');

const CampaignPosts = require('./campaignPostsModel');
const Comments = require('./commentsModel.js');
const SkilledImpactRequests = require('./skilledImpactRequestsModel.js');
const log = require('../../logger');

async function findAll() {
  try {
    const campaigns = await db('campaigns')
      .join('users', 'users.id', 'campaigns.user_id')
      .leftJoin('conservationists as cons', 'cons.user_id', 'users.id')
      .select(
        'users.profile_image',
        'users.location',
        'campaigns.*',
        'campaigns.name as camp_name',
        'cons.name as org_name',
      )
      .where({ 'users.is_deactivated': false });
    return Promise.all(campaigns.map(async (c) => {
      const { image, description } = await CampaignPosts.findOriginalCampaignPostByCampaignId(c.id);
      c.image = image;
      c.description = description;
      c.comments = await Comments.findCampaignComments(c.id);
      return c;
    }));
  } catch (err) {
    throw new Error(err.message);
  }
}

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

async function findCampaignByUserId(userId) {
  const campaigns = await db('campaigns')
    .where('campaigns.user_id', userId)
    .join('users', 'users.id', 'campaigns.user_id')
    .leftJoin('conservationists as cons', 'cons.user_id', 'users.id')
    .select(
      'cons.name as org_name',
      'users.profile_image',
      'users.location',
      'campaigns.*',
    );
  const withUpdates = campaigns.map(async (campaign) => {
    const { image, description } = await CampaignPosts.findOriginalCampaignPostByCampaignId(campaign.id);
    return {
      ...campaign,
      image,
      description,
      updates: await CampaignPosts.findAllCampaignUpdatesByCampaignId(campaign.id),
      comments: await Comments.findCampaignComments(campaign.id),
    };
  });
  return Promise.all(withUpdates);
}

async function insert(campaign) {
  log.verbose(`Inserting new campaign ${campaign}`);
  try {
    const [id] = await db('campaigns')
      .insert(campaign)
      .returning('id');
    if (id) {
      return findById(id);
    }
  } catch (e) {
    log.error(`Error inserting campaign: ${e}`);
  }
}

async function update(campaign, id) {
  const editedCamp = await db('campaigns')
    .where({ id })
    .update(campaign);
  if (editedCamp) {
    return findById(id);
  }
}

async function remove(id) {
  const deleted = await db('campaigns')
    .where({ id })
    .del();
  if (deleted) {
    return id;
  }
  return 0;
}

module.exports = {
  findAll, findById, findCampaignByUserId, insert, remove, update,
};
