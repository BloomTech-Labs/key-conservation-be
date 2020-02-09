const db = require('../database/dbConfig');

module.exports = {
    findSkills
};

// SELECT * FROM skill_impact_requests JOIN project_goals
// on project_goals.skill_impact_requests_id = skill_impact_requests.id
// WHERE skill_impact_requests.campaign_id = 2;
async function findSkills(campaign_id) {
    const skills = await db('skilled_impact_requests')
        .where({campaign_id:campaign_id})
        .join('project_goals', 'project_goals.skilled_impact_request_id', 'skilled_impact_requests.id')
        .select(
            '*'
        )
        .first();
    return skills;
}

