const db = require('../dbConfig');
const pick = require('../../../util/pick.js');
const log = require('../../logger');

async function find(campaignId) {
  return db('project_goals')
    .where({ campaign_id: campaignId })
    .fullOuterJoin('skilled_impact_requests', 'skilled_impact_requests.id', 'project_goals.skilled_impact_request_id')
    .select(
      '*',
    )
    .then((rows) => {
      const skilledRequestsMap = new Map();
      for (let i = 0; i < rows.length; i += 1) {
        const skilledRequest = rows[i];
        if (!skilledRequestsMap.has(skilledRequest.id)) {
          const skillAndProject = {
            skill: skilledRequest.skill,
            point_of_contact: skilledRequest.point_of_contact,
            welcome_message: skilledRequest.welcome_message,
            our_contribution: skilledRequest.our_contribution,
            project_goals: [],
          };
          skilledRequestsMap.set(skilledRequest.id, skillAndProject);
        }
        const projectGoal = {
          goal_title: skilledRequest.goal_title,
          description: skilledRequest.description,
        };
        skilledRequestsMap.get(skilledRequest.id).project_goals.push(projectGoal);
      }
      return Array.from(skilledRequestsMap.values());
    });
}

async function insert(skilledRequests, campaignId) {
  const skillProps = ['skill', 'point_of_contact', 'welcome_message', 'our_contribution'];
  const projectGoals2DArr = [];
  const skilledRequestArr = skilledRequests.map((skilledRequest) => {
    const skilledRequestWithCampaignId = {
      ...pick(skilledRequest, skillProps),
      campaign_id: campaignId,
    };
    projectGoals2DArr.push(skilledRequest.project_goals);
    return skilledRequestWithCampaignId;
  });
  await db.transaction(async (transaction) => {
    try {
      const idArr = await db('skilled_impact_requests')
        .insert(skilledRequestArr)
        .transacting(transaction)
        .returning('id');
      const projectGoalsArr = projectGoals2DArr.map((data, index) => data.map((row) => ({
        ...row,
        skilled_impact_request_id: idArr[index],
      })));
      await db('project_goals').transacting(transaction).insert(projectGoalsArr);
      log.info(`Inserted skiled impact requests and project goals for campaign ${campaignId}`);
      await transaction.commit();
    } catch (err) {
      log.error(`Error inserting skilled impact requests and project goals: ${err}`);
      await transaction.rollback();
    }
  });
}

module.exports = {
  find,
  insert,
};
