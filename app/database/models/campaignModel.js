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

async function findAll(filters) {
  const { skill } = filters;
  try {
    let campaigns = db('campaigns')
      .join('users', 'users.id', 'campaigns.user_id')
      .leftJoin('conservationists as cons', 'cons.user_id', 'users.id')
      .select(
        'users.profile_image',
        'users.location',
        'campaigns.*',
        'campaigns.id as campaign_id',
        'campaigns.name as camp_name',
        'cons.name as org_name',
      )
      .where({ 'users.is_deactivated': false });

    if (skill) {
      campaigns = campaigns
        .join(
          'skilled_impact_requests',
          'skilled_impact_requests.campaign_id',
          'campaigns.id',
        )
        .select(
          'skilled_impact_requests.skill',
          'skilled_impact_requests.id as skilled_impact_request_id',
        )
        .where('skilled_impact_requests.skill', skill);
    }

    campaigns = await campaigns;

    return Promise.all(campaigns.map(async (c) => {
      const { image, description } = await CampaignPosts.findOriginalCampaignPostByCampaignId(c.id);
      const comments = await Comments.findCampaignComments(c.id);
      return {
        ...c,
        image,
        description,
        comments,
      };
    }));
  } catch (err) {
    throw new Error(err.message);
  }
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
  findById, findAll, insert, remove, update,
};
