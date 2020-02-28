const db = require('../database/dbConfig');

const CampUpdate = require('./updateModel.js');
const CampComments = require('./commentsModel.js');

function find() {
  return db('campaigns')
    .join('users', 'users.id', 'campaigns.users_id')
    .leftJoin('conservationists as cons', 'cons.users_id', 'users.id')
    .select(
      'cons.org_name as name',
      'users.profile_image',
      'users.location',
      'campaigns.*'
    )
    .then(campaigns =>
      db('comments')
        .join('users', 'users.id', 'comments.users_id')
        .leftJoin('conservationists as cons', 'cons.users_id', 'users.id')
        .leftJoin('supporters as sup', 'sup.users_id', 'users.id')
        .select(
          'comments.*',
          'users.profile_image',
          'cons.org_name',
          'sup.sup_name',
          'users.is_deactivated'
        )
        .then(comments => {
          return campaigns.map(cam => ({
            ...cam,
            comments: comments
              .filter(com => {
                return com.camp_id === cam.camp_id && !com.is_deactivated;
              })
              .map(com => ({
                ...com,
                name: com.org_name || com.sup_name || 'User'
              }))
          }));
        })
    )
    .then(campaigns =>
      db('users').then(users => {
        return campaigns.filter(camp => {
          const [user] = users.filter(user => user.id === camp.users_id);
          if (user.is_deactivated) {
            return false;
          } else return true;
        });
      })
    );
}

function findCampaign(camp_id) {
  return db('campaigns')
    .where({ camp_id })
    .first();
}

async function findById(camp_id) {
  const campaign = await db('campaigns')
    .where({ camp_id })
    .join('users', 'users.id', 'campaigns.users_id')
    .leftJoin('conservationists as cons', 'cons.users_id', 'campaigns.users_id')
    .select(
      'cons.org_name as name',
      'users.profile_image',
      'users.location',
      'users.is_deactivated',
      'campaigns.*'
    )
    .first();
  campaign.updates = await CampUpdate.findUpdatesByCamp(camp_id);
  campaign.comments = await CampComments.findCampaignComments(camp_id);
  return campaign;
}

function findUser(id) {
  return db('users')
    .leftJoin('conservationists as cons', 'cons.users_id', 'users.id')
    .leftJoin('supporters as sup', 'sup.users_id', 'users.id')
    .where({ id })
    .first()
    .then(usr => ({
      ...usr,
      name: usr.org_name || usr.sup_name || undefined
    }));
}

async function findCampByUserId(users_id) {
  const campaigns = await db('campaigns')
    .where('campaigns.users_id', users_id)
    .join('users', 'users.id', 'campaigns.users_id')
    .leftJoin('conservationists as cons', 'cons.users_id', 'users.id')
    .select(
      'cons.org_name as name',
      'users.profile_image',
      'users.location',
      'campaigns.*'
    );
  const withUpdates = campaigns.map(async camp => {
    camp.updates = await CampUpdate.findUpdatesByCamp(camp.camp_id);
    camp.comments = await CampComments.findCampaignComments(camp.camp_id);
    return camp;
  });
  const result = await Promise.all(withUpdates);
  return result;
}

async function insert(campaign) {
  const [camp_id] = await db('campaigns')
    .insert(campaign)
    .returning('camp_id');
  if (camp_id) {
    const camp = await findById(camp_id);
    return camp;
  }
}

async function update(campaign, camp_id) {
  const editedCamp = await db('campaigns')
    .where({ camp_id })
    .update(campaign);
  if (editedCamp) {
    const camp = await findById(camp_id);
    return camp;
  }
}

async function remove(camp_id) {
  const deleted = await db('campaigns')
    .where({ camp_id })
    .del();
  if (deleted) {
    return camp_id;
  }
  return 0;
}

module.exports = {
  find,
  findCampaign,
  findById,
  findUser,
  findCampByUserId,
  insert,
  remove,
  update
};
