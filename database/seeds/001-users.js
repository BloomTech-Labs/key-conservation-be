exports.seed = function (knex, Promise) {
  return knex('users')
    .del()
    .then(() => knex('users').insert([
      {
        sub: '123456789',
        email: 'info@beavertown.org',
        location: 'Pittsburg, PA',
        species_and_habitats: 'beavers in da dam',
        roles: 'conservationist',
        total_stars: 5,
        total_reviews: 10,
      },
      {
        sub: '897234923',
        email: 'pandalover234@hotmail.com',
        location: 'Phoenix, AZ',
        species_and_habitats: 'pandas sleep on cloud 9',
        roles: 'conservationist',
        total_stars: 20,
        total_reviews: 10,
      },
      {
        sub: '907598347592345238457934',
        email: 'giraffe2tall@gmail.com',
        location: 'Paris, France',
        species_and_habitats: 'the air up there',
        roles: 'conservationist',
        total_stars: 30,
        total_reviews: 10,
      },
    ]));
};
