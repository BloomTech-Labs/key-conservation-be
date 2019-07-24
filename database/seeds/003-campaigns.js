exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('campaigns')
    .del()
    .then(function() {
      // Inserts seed entries
      return knex('campaigns').insert([
        {
          users_id: 1,
          campaign_img:
            'https://i.ebayimg.com/images/g/Op4AAOSwxklcg4uw/s-l400.jpg',
          campaign_name: 'save the eggs',
          campaign_desc: 'lorem ipsum',
          campaign_cta: 'google.com'
        },
        {
          users_id: 1,
          campaign_img:
            'https://upload.wikimedia.org/wikipedia/commons/thumb/8/88/Beaver_Yearling_Grooming_Alhambra_Creek_2008.jpg/1920px-Beaver_Yearling_Grooming_Alhambra_Creek_2008.jpg',
          campaign_name: 'also save the beavers',
          campaign_desc: 'lorem ipsum',
          campaign_cta: 'google.com'
        },
        {
          users_id: 2,
          campaign_img:
            'https://d27ucmmhxk51xv.cloudfront.net/media/english/illustration/panda.jpg',
          campaign_name: 'pillows 4 pandas',
          campaign_desc: 'lorem ipsum',
          campaign_cta: 'google.com'
        },
        {
          users_id: 3,
          campaign_img:
            'https://i.ebayimg.com/images/g/EPsAAOSwDmBY3~D1/s-l400.jpg',
          campaign_name: 'plant more trees in park',
          campaign_desc: 'lorem ipsum',
          campaign_cta: 'google.com'
        }
      ]);
    });
};
