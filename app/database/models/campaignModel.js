const db = require('../dbConfig');

const CampaignUpdate = require('./updateModel.js');
const Comments = require('./commentsModel.js');
const SkilledImpactRequests = require('./skilledImpactRequestsModel.js');
const log = require('../../logger');

async function find() {
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
    return await Promise.all(campaigns.map(async (c) => {
      c.comments = await Comments.findCampaignComments(c.id);
      return c;
    }));
  } catch (err) {
    throw new Error(err.message);
  }
}

function findCampaign(id) {
  return db('campaigns')
    .where({ id })
    .first();
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
  campaign.updates = await CampaignUpdate.findUpdatesByCamp(id);
  campaign.comments = await Comments.findCampaignComments(id);
  campaign.skilled_impact_requests = await SkilledImpactRequests.find(id);
  return campaign;
}

async function findCampByUserId(userId) {
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
  const withUpdates = campaigns.map(async (campaign) => ({
    ...campaign,
    updates: await CampaignUpdate.findUpdatesByCamp(campaign.id),
    comments: await Comments.findCampaignComments(campaign.id),
  }));
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
  find, findCampaign, findById, findCampByUserId, insert, remove, update,
};
