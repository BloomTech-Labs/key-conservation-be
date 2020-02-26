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
            for(let i = 0; i<returnedQuery.length; i++){
                if(!skilledRequestAndProjectGoal.has(returnedQuery[i].id)){
                    let skillAndProject = {
                        skill: returnedQuery[i].skill,
                        point_of_contact: returnedQuery[i].point_of_contact,
                        welcome_message: returnedQuery[i].welcome_message,
                        our_contribution: returnedQuery[i].our_contribution,
                        project_goals:[]
                    };
                    let projectGoal = {
                        goal_title: returnedQuery[i].goal_title,
                        description: returnedQuery[i].description,
                    };
                    skilledRequestAndProjectGoal.set(returnedQuery[i].id, skillAndProject);
                }
                let projectGoal = {
                    goal_title: returnedQuery[i].goal_title,
                    description: returnedQuery[i].description,
                };
                skilledRequestAndProjectGoal.get(returnedQuery[i].id).project_goals.push(projectGoal);
            }
            return Array.from(skilledRequestAndProjectGoal.values());
        });
}

module.exports = { findSkills };

