const db = require('../database/dbConfig');


async function findSkills(campaign_id) {
    const skills = await db('skilled_impact_requests')
        .where({campaign_id})
        .join('project_goals', 'project_goals.skilled_impact_request_id', 'skilled_impact_requests.id')
        .select(
            '*'
        )
    return skills;
}

module.exports = {
    findSkills
};
