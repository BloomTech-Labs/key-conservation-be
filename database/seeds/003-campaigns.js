exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('campaigns')
    .del()
    .then(function() {
      // Inserts seed entries
      return knex('campaigns').insert([
        {
          id: 1,
          campaign_img:
            'https://i.ebayimg.com/images/g/Op4AAOSwxklcg4uw/s-l400.jpg',
          campaign_name: 'save the eggs',
          campaign_desc: 'lorem ipsum',
          campaign_cta: 'google.com'
        },
        {
          id: 2,
          campaign_img:
            'https://d27ucmmhxk51xv.cloudfront.net/media/english/illustration/panda.jpg',
          campaign_name: 'feed the pandas',
          campaign_desc: 'lorem ipsum',
          campaign_cta: 'google.com'
        },
        {
          id: 3,
          campaign_img:
            'https://i.ebayimg.com/images/g/EPsAAOSwDmBY3~D1/s-l400.jpg',
          campaign_name: 'plant more trees in park',
          campaign_desc: 'lorem ipsum',
          campaign_cta: 'google.com'
        }
      ]);
    });
};
