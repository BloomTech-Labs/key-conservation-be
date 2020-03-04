const db = require('../database/dbConfig');

const ProjectGoal = require('./projectGoalsModel.js');


async function findSkilledImpactRequests(campaign_id) {
    return db('project_goals')
        .where({campaign_id})
        .fullOuterJoin('skilled_impact_requests', 'skilled_impact_requests.id','project_goals.skilled_impact_request_id')
        .select(
           '*'
        )
        .then((returnedQuery)=>{
            const skilledRequests = new Map();
            for(let i = 0; i<returnedQuery.length; i++){
                if(!skilledRequests.has(returnedQuery[i].id)){
                    let skillAndProject = {
                        skill: returnedQuery[i].skill,
                        point_of_contact: returnedQuery[i].point_of_contact,
                        welcome_message: returnedQuery[i].welcome_message,
                        our_contribution: returnedQuery[i].our_contribution,
                        project_goals:[]
                    };
                    skilledRequests.set(returnedQuery[i].id, skillAndProject);
                }
                let projectGoal = {
                    goal_title: returnedQuery[i].goal_title,
                    description: returnedQuery[i].description,
                };
                skilledRequests.get(returnedQuery[i].id).project_goals.push(projectGoal);
            }
            return Array.from(skilledRequests.values());
        });
}


async function insertSkilledRequestsAndProjectGoals(skilledRequests, campaign_id){
    let skillImpactRequests={};

    for (let skilledRequest of skilledRequests) {
        const skillProps=['skill','point_of_contact','welcome_message','our_contribution'];
        skillImpactRequests = await pick(skilledRequest,skillProps);
        skillImpactRequests.campaign_id=campaign_id;
        let skillImpactRequestId = await insert(skillImpactRequests);

        for(let projectGoal of skilledRequest.project_goals){
            projectGoal.skilled_impact_request_id = skillImpactRequestId;
            await ProjectGoal.insert(projectGoal);
        }
    }
}

async function insert(skilledImpactRequest){
    const [skilledImpactRequestId] = await db('skilled_impact_requests')
        .insert(skilledImpactRequest)
        .returning('id');
    if (skilledImpactRequestId) {
        return skilledImpactRequestId;
    }
}

async function pick(obj, props) {
    return Object.keys(obj)
        .filter(key => props.includes(key))
        .reduce((picked, key) => ({...picked, [key]: obj[key]}), {});
}

module.exports = {
    findSkilledImpactRequests,
    insertSkilledRequestsAndProjectGoals,
    insert
};

