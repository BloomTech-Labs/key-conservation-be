exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('campaigns')
    .del()
    .then(function() {
      // Inserts seed entries
      return knex('campaigns').insert([
        {
          users_id: 1,
          camp_img:
            'https://i.ebayimg.com/images/g/Op4AAOSwxklcg4uw/s-l400.jpg',
          camp_name: 'save the eggs',
          camp_desc: 'lorem ipsum',
          camp_cta: 'google.com'
        },
        {
          users_id: 1,
          camp_img:
            'https://upload.wikimedia.org/wikipedia/commons/thumb/8/88/Beaver_Yearling_Grooming_Alhambra_Creek_2008.jpg/1920px-Beaver_Yearling_Grooming_Alhambra_Creek_2008.jpg',
          camp_name: 'also save the beavers',
          camp_desc: 'lorem ipsum',
          camp_cta: 'google.com'
        },
        {
          users_id: 2,
          camp_img:
            'https://d27ucmmhxk51xv.cloudfront.net/media/english/illustration/panda.jpg',
          camp_name: 'pillows 4 pandas',
          camp_desc: 'lorem ipsum',
          camp_cta: 'google.com'
        },
        {
          users_id: 3,
          camp_img:
            'https://i.ebayimg.com/images/g/EPsAAOSwDmBY3~D1/s-l400.jpg',
          camp_name: 'plant more trees in park',
          camp_desc: 'lorem ipsum',
          camp_cta: 'google.com'
        }
      ]);
    });
};
