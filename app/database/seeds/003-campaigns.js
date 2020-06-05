const TABLE_NAME = 'campaigns';
// COMPLETED
exports.seed = (knex, Promise) => {
  knex(TABLE_NAME)
    .del()
    .then(() => {
      knex(TABLE_NAME).insert([
        {
          // new: 1
          // id: '1',
          user_id: 6,
          created_at: '2020-02-28 09:14:48.775116-06',
          name: 'Save The Doggos',
          call_to_action: 'https://facebook.com',
          urgency: '',
        },
        {
          // new: 2
          // id: '3',
          user_id: 3,
          created_at: '2020-02-28 10:04:33.514144-06',
          name: 'New Campaign',
          call_to_action: 'https://grass.com',
          urgency: 'Longterm',
        },
        {
          // new: 3
          // id: '6',
          user_id: 3,
          created_at: '2020-02-28 10:25:57.528376-06',
          name: 'New Campaign',
          call_to_action: 'https://flowers.com',
          urgency: 'Longterm',
        },
        {
          // new: 4
          // id: '7',
          user_id: 18,
          created_at: '2020-02-28 14:19:18.731356-06',
          name: 'Save the Sloths ',
          call_to_action: 'https://www.google.com',
          urgency: 'Critical',
        },
        {
          // new: 5
          // id: '8',
          user_id: 3,
          created_at: '2020-02-28 14:44:47.470324-06',
          name: 'Save the doggos',
          call_to_action: 'https://google.com',
          urgency: 'Longterm',
        },
        {
          // new: 6
          // id: '9',
          user_id: 1,
          created_at: '2020-02-28 16:27:55.50386-06',
          name: 'Save The Doggos',
          call_to_action: 'https://donate.com',
          urgency: '',
        },
        {
          // new: 7
          // id: '10',
          user_id: 39,
          created_at: '2020-03-02 14:35:21.309845-06',
          name: 'Hey every1 ',
          call_to_action: 'https://donate.com',
          urgency: 'Critical',
        },
        {
          // new: 8
          // id: '11',
          user_id: 39,
          created_at: '2020-03-02 17:29:49.824094-06',
          name: 'Urgent test',
          call_to_action: 'https://donate.com',
          urgency: 'Urgent',
        },
        {
          // new: 9
          // id: '18',
          user_id: 41,
          created_at: '2020-03-24 20:13:20.248532-05',
          name: 'send money',
          call_to_action: 'https://www.google.com/',
          urgency: 'Urgent',
        },
        {
          // new: 10
          // id: '19',
          user_id: 54,
          created_at: '2020-03-26 11:27:33.612108-05',
          name: 'New fish being sent to Lake Clearwater',
          call_to_action: 'https://donate.org',
          urgency: 'Longterm',
        },
        {
          // new: 11
          // id: '22',
          user_id: 44,
          created_at: '2020-03-27 17:14:56.631524-05',
          name: 'Look at this good boy',
          call_to_action: 'https://www.google.com/',
          urgency: 'Longterm',
        },
        {
          // new: 12
          // id: '72',
          user_id: 55,
          created_at: '2020-04-08 15:05:57.295225-05',
          name: 'Resources and More',
          call_to_action: 'https://coral.org',
          urgency: 'Longterm',
        },
        {
          // new: 13
          // id: '70',
          user_id: 45,
          created_at: '2020-04-08 13:48:37.430366-05',
          name:
            'Coronavirus in Mumbai: Vets advise pet owners not to panic after tiger tests virus positive',
          call_to_action: 'https://mumbai.org',
          urgency: 'Urgent',
        },
        {
          // new: 14
          // id: '66',
          user_id: 58,
          created_at: '2020-04-07 13:24:17.236342-05',
          name: 'Gator Park Closed',
          call_to_action: 'https://donate.org',
          urgency: 'Longterm',
        },
        {
          // new: 15
          // id: '71',
          user_id: 47,
          created_at: '2020-04-08 14:39:34.394967-05',
          name: 'Latest updates',
          call_to_action: 'https://donate.org',
          urgency: 'Longterm',
        },
        {
          // new: 16
          // id: '73',
          user_id: 56,
          created_at: '2020-04-08 15:40:18.135397-05',
          name: 'Presidio Forest Bathing Tree Tour',
          call_to_action: 'https://donate.org',
          urgency: '',
        },
        {
          // new: 17
          // id: '74',
          user_id: 57,
          created_at: '2020-04-08 15:51:01.650516-05',
          name: 'Bats are the only mammals capable of true flight.',
          call_to_action: 'https://donate.org',
          urgency: '',
        },
        {
          // new: 18
          // id: '151',
          user_id: 76,
          created_at: '2020-05-17 14:08:32.267402-05',
          name: 'Sylvester wants wet food',
          call_to_action: 'https://catfood.com',
          urgency: 'Critical',
        },
        {
          // new: 19
          // id: '153',
          user_id: 58,
          created_at: '2020-05-17 15:12:31.471103-05',
          name: 'Restoring our habitats',
          call_to_action: 'https://donate.org',
          urgency: 'Longterm',
        },
        {
          // new: 20
          // id: '154',
          user_id: 76,
          created_at: '2020-05-18 13:32:12.996902-05',
          name: 'Test post',
          call_to_action: 'https://google.com',
          urgency: 'Critical',
        },
        {
          // new: 21
          // id: '156',
          user_id: 44,
          created_at: '2020-05-18 18:35:08.143187-05',
          name: 'Protecting migration paths',
          call_to_action: 'https://www.keyconservation.org/donate',
          urgency: 'Longterm',
        },
        {
          // new: 22
          // id: '157',
          user_id: 54,
          created_at: '2020-05-24 15:09:43.348455-05',
          name: 'Raptor Prey Hunting',
          call_to_action: 'https://donate.org',
          urgency: 'Urgent',
        },
        {
          // new: 23
          // id: '165',
          user_id: 44,
          created_at: '2020-05-30 19:17:15.495535-05',
          name: 'Skilled Impact Requests!',
          call_to_action: 'https://tse.ucsd.edu/winners',
          urgency: 'Longterm',
        },
        {
          // new: 24
          // id: '173',
          user_id: 54,
          created_at: '2020-05-31 18:46:41.635896-05',
          name: 'Testing Multiple Skills with multiple Project Goals',
          call_to_action: 'https://testlink',
          urgency: 'Longterm',
        },
        {
          // new: 25
          // id: '174',
          user_id: 54,
          created_at: '2020-06-01 01:36:01.264926-05',
          name: 'Testing More',
          call_to_action: 'https://google',
          urgency: '',
        },
        {
          // new: 26
          // id: '175',
          user_id: 54,
          created_at: '2020-06-03 01:24:44.564747-05',
          name: 'Amazing View',
          call_to_action: 'https://google.com',
          urgency: 'Longterm',
        },
        {
          // new: 27
          // id: '177',
          user_id: 54,
          created_at: '2020-06-03 01:43:00.547833-05',
          name: 'Adding Games',
          call_to_action: 'https://none',
          urgency: '',
        },
      ]);
    });
};
