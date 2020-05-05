const TABLE_NAME = 'campaign_posts';
exports.seed = (knex, Promise) => knex(TABLE_NAME).del().then(() => knex(TABLE_NAME).insert([
  {
    // id: 1,
    campaign_id: 1,
    image: 'https://i.ebayimg.com/images/g/Op4AAOSwxklcg4uw/s-l400.jpg',
    description: 'Melon in hay rake. Veterinarian at Seeder eggs with watermelon ostriches. Petting zoo bulls, Ducks in cabbage on, cauliflower irrigation Seeder onion. Post pounder calf, hay or duck is, tool shed horse. Grapes at yams mushrooms organic berries gobble. Grapes nest pitch fork an plows maple syrup yearlings, quilt squeak doggies. Apples ducks straw, quail a ostriches donkey, hay hook cucumbers. Kidney beans ostric.',
    is_update: false,
  },
  {
    // id: 2,
    campaign_id: 2,
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/88/Beaver_Yearling_Grooming_Alhambra_Creek_2008.jpg/1920px-Beaver_Yearling_Grooming_Alhambra_Creek_2008.jpg',
    description: 'Are porky pig beef, sheep rose garden sage, in pitch fork sunflower cowpies mice. Onion organic oranges and purr ducks canning owls at a squeal. Straw augers beef kettle our crickets. Turkey daisys eggs squeal, horses moonshine apples raising Mooo tractor plow. . Apples ducks straw, quail.',
    is_update: false,
  },
  {
    // id: 3,
    campaign_id: 3,
    image: 'https://d27ucmmhxk51xv.cloudfront.net/media/english/illustration/panda.jpg',
    description: 'Pets in. John Deere bees, parsley sweet corn at, porky pig shovels. Post pounder calf, hay or duck is, tool shed horse. Forage Harvester rakes peacocks, squeal garden woof. Peacocks baa ostriches owls. Hoot squeal moose quack, crows doggies frogs crickets chirp. Onion organic oranges and purr ducks canning owls at a squeal. Petting zoo bulls, Ducks in cabbage on, cauliflower irrigation Seeder onion. Ewes mushrooms zucchini in forage Harvester at sheep with tractor. Onion organic.',
    is_update: false,
  },
  {
    // id: 4,
    campaign_id: 4,
    image: 'https://i.ebayimg.com/images/g/EPsAAOSwDmBY3~D1/s-l400.jpg',
    description: 'Mushrooms zucchini in forage Harvester at sheep with tractor. Post pounder calf, hay or duck is, tool shed horse. Prairie dogs raccoons robins rats. Gourds utters at welding equipment a oink oink haybine. Cauliflower a seeds quail. Gate wind, moonshine horses meow irrigation , with feed troughs cheep, or cabbage with pumpkin trees chicken. Mouse soybeans sweet corn hogs llamas or oink oink wind. John Deere bees, parsley sweet corn.',
    is_update: false,
  },
  {
    // id: 5,
    campaign_id: 2,
    image: 'https://keyconservation.s3.us-west-1.amazonaws.com/files/1585351735678_photo.jpg',
    description: 'We saved the beavers!',
    is_update: true,
  },
  {
    // id: 6,
    campaign_id: 4,
    image: 'https://keyconservation.s3.us-west-1.amazonaws.com/files/1585501450042_photo.jpg',
    description: 'We planted some trees today',
    is_update: true,
  },
]));
