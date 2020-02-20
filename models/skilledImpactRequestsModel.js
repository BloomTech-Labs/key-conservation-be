const db = require('../database/dbConfig');

async function findSkills(campaign_id) {

    return db('skilled_impact_requests')
        .where({campaign_id})
        .select(
            '*'
        ).then((skilledImpactRequests)=>db('project_goals').then((projectGoals)=>{
            skilledImpactRequests.map((sIR)=>(sIR.project_goals = projectGoals.filter(
                (projectGoal) => projectGoal.skilled_impact_request_id === sIR.id,
            )));

            return skilledImpactRequests;
        }));

}

module.exports = {
    findSkills
};
