const db = require('../database/dbConfig');

async function findSkills(campaign_id) {
    return db('project_goals')
        .where({campaign_id})
        .fullOuterJoin('skilled_impact_requests', 'skilled_impact_requests.id','project_goals.skilled_impact_request_id')
        .select(
           '*'
        )
        .then((returnedQuery)=>{
            const skilledRequestAndProjectGoal = new Map();
            let skillAndProject = {
                skill: returnedQuery[0].skill,
                point_of_contact: returnedQuery[0].point_of_contact,
                welcome_message: returnedQuery[0].welcome_message,
                our_contribution: returnedQuery[0].our_contribution,
                project_goals:[{
                goal_title: returnedQuery[0].goal_title,
                description: returnedQuery[0].description,
                }]
            };
            skilledRequestAndProjectGoal.set(returnedQuery[0].id, skillAndProject);
            for(let i = 1; i<returnedQuery.length; i++){
                if(skilledRequestAndProjectGoal.has(returnedQuery[i].id)){
                    let projectGoal = {
                        goal_title: returnedQuery[i].goal_title,
                        description: returnedQuery[i].description,
                    };
                    skilledRequestAndProjectGoal.get(returnedQuery[i].id).project_goals.push(projectGoal);
                }
                else{
                    skillAndProject = {
                        skill: returnedQuery[i].skill,
                        point_of_contact: returnedQuery[i].point_of_contact,
                        welcome_message: returnedQuery[i].welcome_message,
                        our_contribution: returnedQuery[i].our_contribution,
                        project_goals:[{
                            goal_title: returnedQuery[i].goal_title,
                            description: returnedQuery[i].description,
                        }]
                    };
                    skilledRequestAndProjectGoal.set(returnedQuery[i].id, skillAndProject);
                }
            }
            return Array.from(skilledRequestAndProjectGoal.values());
        });
}

module.exports = { findSkills };

