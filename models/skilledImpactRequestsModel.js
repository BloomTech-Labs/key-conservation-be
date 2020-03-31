const db = require('../database/dbConfig');

const pick = require('../util/pick.js');

async function findSkilledImpactRequests(campaign_id) {
    return await db('project_goals')
        .where({campaign_id})
        .fullOuterJoin('skilled_impact_requests', 'skilled_impact_requests.id','project_goals.skilled_impact_request_id')
        .select(
           '*'
        )
        .then((rows)=>{
            const skilledRequestsMap = new Map();
            for(const skilledRequest of rows){
                    if(!skilledRequestsMap.has(skilledRequest.id)){
                        const skillAndProject = {
                            skill: skilledRequest.skill,
                            point_of_contact: skilledRequest.point_of_contact,
                            welcome_message: skilledRequest.welcome_message,
                            our_contribution: skilledRequest.our_contribution,
                            project_goals:[]
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
    for (const skilledRequest of skilledRequests) {
        const skilledRequestsWithCampaignId = {
            ...pick(skilledRequest, skillProps),
            campaign_id: campaign_id
        };
        db.transaction(function (transaction) {
             db("skilled_impact_requests")
                .transacting(transaction)
                .insert(skilledRequestsWithCampaignId)
                .returning('id')
                .then(function (idArr) {
                     return Promise.all((skilledRequest.project_goals).map( function (project_goal) {
                        project_goal.skilled_impact_request_id = idArr[0];
                        return db('project_goals').transacting(transaction).insert(project_goal).returning('id');
                    }));
                })
                .then(transaction.commit)
                .catch(transaction.rollback)
        })
            .then(function () {
                // transaction suceeded, data written
                console.log('Inserted skilled impact requests and project goals ');
            })
            .catch(function () {
                // transaction failed, data rolled back
                console.log('Error inserting skilled impact requests and project goals.');
            });
    }
}

module.exports = {
    findSkilledImpactRequests,
    insertSkilledImpactRequests
};

