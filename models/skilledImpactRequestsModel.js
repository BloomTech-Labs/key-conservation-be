const db = require('../database/dbConfig');

async function findSkills(campaign_id) {
    return db('project_goals')
        .where({campaign_id})
        .join('skilled_impact_requests', 'skilled_impact_requests.id','project_goals.skilled_impact_request_id')
        .select(
           '*'
        )
        .then((returnedQuery)=>{
            let skilledRequestAndProjectGoal=[];
            let projectGoalJSON = {
                goal_title: returnedQuery[0].goal_title,
                description: returnedQuery[0].description,
            };
            let skillAndProjectGoalJSON={
                skill: returnedQuery[0].skill,
                point_of_contact: returnedQuery[0].point_of_contact,
                welcome_message: returnedQuery[0].welcome_message,
                our_contribution: returnedQuery[0].our_contribution,
                project_goals: [projectGoalJSON]
            };
            let skillRequestIndex = 0;
            let skillID = returnedQuery[0].id;
            skilledRequestAndProjectGoal.push(skillAndProjectGoalJSON);
            for(let i = 1; i<returnedQuery.length; i++){
                if(skillID == returnedQuery[i].id){
                    projectGoalJSON = {
                        goal_title: returnedQuery[i].goal_title,
                        description: returnedQuery[i].description,
                    };
                    skilledRequestAndProjectGoal[skillRequestIndex].project_goals.push(projectGoalJSON);
                }else{
                    skillID = returnedQuery[i].id;
                    skillRequestIndex++;
                    projectGoalJSON = {
                        goal_title: returnedQuery[i].goal_title,
                        description: returnedQuery[i].description,
                    };
                    skillAndProjectGoalJSON={
                        skill: returnedQuery[i].skill,
                        point_of_contact: returnedQuery[i].point_of_contact,
                        welcome_message: returnedQuery[i].welcome_message,
                        our_contribution: returnedQuery[i].our_contribution,
                        project_goals: [projectGoalJSON]
                    };
                    skilledRequestAndProjectGoal.push(skillAndProjectGoalJSON);
                }
            }
            return skilledRequestAndProjectGoal;
        });
}

module.exports = { findSkills };

