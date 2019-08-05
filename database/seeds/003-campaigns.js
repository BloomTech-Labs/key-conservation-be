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
          camp_desc: 'Melon in hay rake. Veterinarian at Seeder eggs with watermelon ostriches. Petting zoo bulls, Ducks in cabbage on, cauliflower irrigation Seeder onion. Post pounder calf, hay or duck is, tool shed horse. Grapes at yams mushrooms organic berries gobble. Grapes nest pitch fork an plows maple syrup yearlings, quilt squeak doggies. Apples ducks straw, quail a ostriches donkey, hay hook cucumbers. Kidney beans ostric.',
          camp_cta: 'google.com'
        },
        {
          users_id: 1,
          camp_img:
            'https://upload.wikimedia.org/wikipedia/commons/thumb/8/88/Beaver_Yearling_Grooming_Alhambra_Creek_2008.jpg/1920px-Beaver_Yearling_Grooming_Alhambra_Creek_2008.jpg',
          camp_name: 'also save the beavers',
          camp_desc: 'Are porky pig beef, sheep rose garden sage, in pitch fork sunflower cowpies mice. Onion organic oranges and purr ducks canning owls at a squeal. Straw augers beef kettle our crickets. Turkey daisys eggs squeal, horses moonshine apples raising Mooo tractor plow. . Apples ducks straw, quail.',
          camp_cta: 'google.com'
        },
        {
          users_id: 2,
          camp_img:
            'https://d27ucmmhxk51xv.cloudfront.net/media/english/illustration/panda.jpg',
          camp_name: 'pillows 4 pandas',
          camp_desc: 'Pets in. John Deere bees, parsley sweet corn at, porky pig shovels. Post pounder calf, hay or duck is, tool shed horse. Forage Harvester rakes peacocks, squeal garden woof. Peacocks baa ostriches owls. Hoot squeal moose quack, crows doggies frogs crickets chirp. Onion organic oranges and purr ducks canning owls at a squeal. Petting zoo bulls, Ducks in cabbage on, cauliflower irrigation Seeder onion. Ewes mushrooms zucchini in forage Harvester at sheep with tractor. Onion organic.',
          camp_cta: 'google.com'
        },
        {
          users_id: 3,
          camp_img:
            'https://i.ebayimg.com/images/g/EPsAAOSwDmBY3~D1/s-l400.jpg',
          camp_name: 'plant more trees in park',
          camp_desc: 'Mushrooms zucchini in forage Harvester at sheep with tractor. Post pounder calf, hay or duck is, tool shed horse. Prairie dogs raccoons robins rats. Gourds utters at welding equipment a oink oink haybine. Cauliflower a seeds quail. Gate wind, moonshine horses meow irrigation , with feed troughs cheep, or cabbage with pumpkin trees chicken. Mouse soybeans sweet corn hogs llamas or oink oink wind. John Deere bees, parsley sweet corn.',
          camp_cta: 'google.com'
        }
      ]);
    });
};
