// completed AC

const TABLE_NAME = 'skilled_impact_requests';
exports.seed = (knex, Promise) => {
  return knex(TABLE_NAME)
    .del()
    .then(() =>
      knex(TABLE_NAME).insert([
        {
          // new: 1
          // id: '1',
          campaign_id: 16,
          skill: 'DRONE',
          point_of_contact: 'hello@gmail.com',
          welcome_message: 'Hello!',
          our_contribution: 'No Contribution',
        },
        {
          // new: 2
          // id: '2',
          campaign_id: 12,
          skill: 'ARCHITECTURE',
          point_of_contact: 'goodbye@gmail.com',
          welcome_message: 'Goodbye!',
          our_contribution: 'No Contribution',
        },
        {
          // new: 3
          // id: '3',
          campaign_id: 13,
          skill: 'DRONE',
          point_of_contact: 'drone@gmail.com',
          welcome_message: 'Drones!',
          our_contribution: 'Please use our drones!',
        },
        {
          // new: 4
          // id: '4',
          campaign_id: 14,
          skill: 'DRONE',
          point_of_contact: 'dronesss@gmail.com',
          welcome_message: 'Drones!!!!!!',
          our_contribution: 'Please take our drones!',
        },
        {
          // new: 5
          // id: '15',
          campaign_id: 16,
          skill: 'AUTO',
          point_of_contact: 'Auto ',
          welcome_message: 'Hello there amazing supporter',
          our_contribution: 'Contributing Auto',
        },
        {
          // new: 6
          // id: '16',
          campaign_id: 24,
          skill: 'DRONE',
          point_of_contact: 'Drone',
          welcome_message: 'Welcome drone supporters',
          our_contribution: 'Drone contribution',
        },
        {
          // new: 7
          // id: '17',
          campaign_id: 25,
          skill: 'AUTO',
          point_of_contact: 'Auto',
          welcome_message: 'Hello',
          our_contribution: 'None',
        },
        {
          // new: 8
          // id: '18',
          campaign_id: 25,
          skill: 'ART',
          point_of_contact: 'Art',
          welcome_message: 'Art',
          our_contribution: 'Hi',
        },
        {
          // new: 9
          // id: '19',
          campaign_id: 26,
          skill: 'DRONE',
          point_of_contact: 'Me',
          welcome_message: 'Welcome to the amazing place',
          our_contribution: 'None',
        },
        {
          // new: 10
          // id: '21',
          campaign_id: 27,
          skill: 'GAMING',
          point_of_contact: 'None',
          welcome_message: 'Welcome gamers',
          our_contribution: 'None',
        },
        {
          // new: 11
          // id: '22',
          campaign_id: 27,
          skill: 'HUMAN_RESOURCES',
          point_of_contact: 'Human',
          welcome_message: 'Welcome\t',
          our_contribution: 'None',
        },
      ])
    );
};
