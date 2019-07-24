exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users')
    .del()
    .then(function() {
      // Inserts seed entries
      return knex('users').insert([
        {
          username: 'Dam Fine',
          email: 'info@beavertown.org',
          location: 'Pittsburg, PA',
          roles: 'conservationist'
        },
        {
          username: 'Love Them Pandas',
          email: 'pandalover234@hotmail.com',
          location: 'Phoenix, AZ',
          roles: 'conservationist'
        },
        {
          username: 'Giraffe 2 Tall',
          email: 'giraffe2tall@gmail.com',
          location: 'Paris, France',
          roles: 'conservationist'
        }
      ]);
    });
};
