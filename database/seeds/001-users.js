exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users')
    .del()
    .then(function() {
      // Inserts seed entries
      return knex('users').insert([
        {
          sub: "123456789",
          username: 'Dam Fine',
          email: 'info@beavertown.org',
          location: 'Pittsburg, PA',
          species_and_habitats: 'beavers in da dam',
          roles: 'conservationist'
        },
        {
          sub: "897234923",
          username: 'Love Them Pandas',
          email: 'pandalover234@hotmail.com',
          location: 'Phoenix, AZ',
          species_and_habitats: 'pandas sleep on cloud 9',
          roles: 'conservationist'
        },
        {
          sub: "907598347592345238457934",
          username: 'Giraffe 2 Tall',
          email: 'giraffe2tall@gmail.com',
          location: 'Paris, France',
          species_and_habitats: 'the air up there',
          roles: 'conservationist'
        }
      ]);
    });
};
