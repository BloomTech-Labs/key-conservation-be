const db = require('../database/dbConfig');

const ProjectGoal = require('./projectGoalsModel.js');
const pick = require('../util/pick.js');

async function findSkilledImpactRequests(campaign_id) {
    return await db('project_goals')
        .where({campaign_id})
        .fullOuterJoin('skilled_impact_requests', 'skilled_impact_requests.id','project_goals.skilled_impact_request_id')
        .select(
           '*'
        )
        .then((returnedQuery)=>{
            const skilledRequests = new Map();
            for(let i = 0; i<returnedQuery.length; i++){
                if(!skilledRequests.has(returnedQuery[i].id)){
                    const skillAndProject = {
                        skill: returnedQuery[i].skill,
                        point_of_contact: returnedQuery[i].point_of_contact,
                        welcome_message: returnedQuery[i].welcome_message,
                        our_contribution: returnedQuery[i].our_contribution,
                        project_goals:[]
                    };
                    skilledRequests.set(returnedQuery[i].id, skillAndProject);
                }
                const projectGoal = {
                    goal_title: returnedQuery[i].goal_title,
                    description: returnedQuery[i].description,
                };
                skilledRequests.get(returnedQuery[i].id).project_goals.push(projectGoal);
            }
            return Array.from(skilledRequests.values());
        });
}

async function insertSkilledImpactRequests(skilledRequests, campaign_id) {
    for (const skilledRequest of skilledRequests) {
        const skillProps = ['skill', 'point_of_contact', 'welcome_message', 'our_contribution'];
        const skillImpactRequests = {
            ...pick(skilledRequest, skillProps),
            campaign_id: campaign_id
        };
        db.transaction(function (transaction) {
             db("skilled_impact_requests")
                .transacting(transaction)
                .insert(skillImpactRequests)
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

