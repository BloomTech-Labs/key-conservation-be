const db = require('../database/dbConfig');

const pick = require('../util/pick.js');

async function findSkilledImpactRequests(campaign_id) {
  return db('project_goals')
    .where({ campaign_id })
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

async function insertSkilledImpactRequests(skilledRequests, campaign_id) {
  const skillProps = ['skill', 'point_of_contact', 'welcome_message', 'our_contribution'];
  const projectGoals2DArr = [];
  const skilledRequestArr = skilledRequests.map((skilledRequest) => {
    const skilledRequestWithCampaignId = {
      ...pick(skilledRequest, skillProps),
      campaign_id,
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
      const projectGoalsArr = [].concat(...projectGoals2DArr.map((data, index) => {
        data = data.map((row) => {
          row.skilled_impact_request_id = idArr[index];
          return row;
        });
        return data;
      }));
      await db('project_goals').transacting(transaction).insert(projectGoalsArr);
      console.log('Inserted skilled impact requests and project goals ');
      await transaction.commit();
    } catch (err) {
      console.log('Error inserting skilled impact requests and project goals.', err);
      await transaction.rollback();
    }
  });
}

module.exports = {
  findSkilledImpactRequests,
  insertSkilledImpactRequests,
};
