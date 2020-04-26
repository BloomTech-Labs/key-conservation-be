
exports.seed = function (knex, Promise) {
  return knex('skilled_impact_requests')
    .del()
    .then(() => knex('skilled_impact_requests').insert([
      {
        campaign_id: 1,
        skill: "WEB_DEVELOPMENT",
        point_of_contact: 'Alby Prude',
        welcome_message: 'Welcome!',
        our_contribution: 'We do things for the environment!',
      },
      {
        campaign_id: 1,
        skill: "WEB_DEVELOPMENT",
        point_of_contact: 'Alby Prude',
        welcome_message: 'Welcome!',
        our_contribution: 'We do things for the environment!',
      },
      {
        campaign_id: 1,
        skill: "WEB_DEVELOPMENT",
        point_of_contact: 'Alby Prude',
        welcome_message: 'Welcome!',
        our_contribution: 'We do things for the environment!',
      },
    ]));
};
