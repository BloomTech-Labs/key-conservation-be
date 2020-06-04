const TABLE_NAME = 'supporters';
// complete AC MC AG
exports.seed = (knex, Promise) => {

  return knex(TABLE_NAME)
    .del()
    .then(() => knex(TABLE_NAME).insert([

        {
          // id: '10',
          user_id: 5,
          name: 'Jasmine Khoury',
        },
        {
          // id: '21',
          user_id: 3,
          name: 'HELLO',
        },
        {
          // id: '9',
          user_id: 16,
          name: 'Brianna Workman',
        },
        {
          // id: '54',
          user_id: 26,
          name: 'Richard TL',
        },
        {
          // id: '72',
          user_id: 21,
          name: 'Bird Bees',
        },
        {
          // id: '73',
          user_id: 22,
          name: 'Richard',
        },
        {
          // id: '76',
          user_id: 43,
          name: 'Salii',
        },
        {
          // id: '77',
          user_id: 85,
          name: 'Leo man ',
        },
        {
          // id: '2',
          user_id: 23,
          name: 'Mo Money ? ?',
        },
        {
          // id: '30',
          user_id: 27,
          name: 'Katie support',
        },
        {
          // id: '32',
          user_id: 33,
          name: 'Kelly',
        },
        {
          // id: '33',
          user_id: 34,
          name: 'Doggo Supporter 2',
        },
        {
          // id: '34',
          user_id: 35,
          name: 'Doggo Supporter 3',
        },
        {
          // id: '35',
          user_id: 36,
          name: 'Wutwutwut',
        },
        {
          // id: '36',
          user_id: 13,
          name: 'A new person',
        },
        {
          // id: '37',
          user_id: 38,
          name: 'Robert',
        },
        {
          // id: '39',
          user_id: 42,
          name: 'agohorel',
        },
        {
          // id: '40',
          user_id: 28,
          name: 'Big Cat Rescue',
        },
        {
          // id: '41',
          user_id: 46,
          name: 'Testing',
        },
        {
          // id: '42',
          user_id: 31,
          name: 'Jess novak',
        },
        {
          // id: '43',
          user_id: 8,
          name: 'Kgzitsy',
        },
        {
          // id: '29',
          user_id: 29,
          name: 'Katie F.',
        },
        {
          // id: '46',
          user_id: 30,
          name: 'Daniel Lazarov',
        },
        {
          // id: '48',
          user_id: 40,
          name: 'agohorel',
        },
        {
          // id: '52',
          user_id: 60,
          name: 'Richrd',
        },
        {
          // id: '53',
          user_id: 51,
          name: 'Cat Corale',
        },
        {
          // id: '55',
          user_id: 61,
          name: 'Testing',
        },
        {
          // id: '56',
          user_id: 62,
          name: 'Callahan',
        },
        {
          // id: '57',
          user_id: 63,
          name: 'Jessica Cromp',
        },
        {
          // id: '1',
          user_id: 2,
          name: 'Mohammad Tourjoman',
        },
        {
          // id: '68',
          user_id: 84,
          name: 'Freddy',
        },
        {
          // id: '38',
          user_id: 53,
          name: 'Abcdef',
        },
        {
          // id: '69',
          user_id: 70,
          name: 'Loopty',
        },
        {
          // id: '58',
          user_id: 69,
          name: 'Richard',
        },
        {
          // id: '47',
          user_id: 81,
          name: 'Leah Kelley',
        },
        {
          // id: '59',
          user_id: 71,
          name: 'dev-test',
        },
        {
          // id: '60',
          user_id: 64,
          name: 'Callahan',
        },
        {
          // id: '44',
          user_id: 52,
          name: 'nicolas.wl',
        },
        {
          // id: '51',
          user_id: 86,
          name: 'Megan Cromp',
        },
        {
          // id: '45',
          user_id: 59,
          name: 'Maria Santos',
        },
        {
          // id: '70',
          user_id: 83,
          name: 'Tallahassee ',
        },
      ]));
};
