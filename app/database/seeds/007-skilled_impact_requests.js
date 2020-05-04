const TABLE_NAME = 'skilled_impact_requests';
exports.seed = (knex, Promise) => knex(TABLE_NAME).del().then(() => knex(TABLE_NAME).insert([
  {
    // id: 1,
    campaign_id: 2,
    skill: 'ARCHITECTURE',
    point_of_contact: 'Frank LLoyd Wright (frankll@wright.com)',
    welcome_message: 'Welcome to  Beaver Town!',
    our_contribution: 'We\'ll send you some preliminary designs by end of day!',
  },
  {
    // id: 2,
    campaign_id: 3,
    skill: 'PHOTOGRAPHY',
    point_of_contact: 'Joel Sternfeld',
    welcome_message: 'Thanks for your interest!',
    our_contribution: 'We can reimburse you for costs, e.g. film rolls.',
  },
  {
    // id: 3,
    campaign_id: 4,
    skill: 'DRONE',
    point_of_contact: 'Johnny Appleseed',
    welcome_message: 'Thanks for volunteering to spray seeds!',
    our_contribution: 'We\'ll contact you shortly',
  },
]));
