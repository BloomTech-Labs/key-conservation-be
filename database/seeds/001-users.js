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
          roles: 'conservationist'
        },
        {
          sub: "897234923",
          username: 'Love Them Pandas',
          email: 'pandalover234@hotmail.com',
          location: 'Phoenix, AZ',
          roles: 'conservationist'
        },
        {
          sub: "907598347592345238457934",
          username: 'Giraffe 2 Tall',
          email: 'giraffe2tall@gmail.com',
          location: 'Paris, France',
          roles: 'conservationist'
        },
        {
          sub: "666666666666666663",
          username: 'Sally McUserface',
          email: 'example@gmail.com',
          location: 'Rent free in your head',
          roles: 'supporter'
        }
      ]);
    });
};
