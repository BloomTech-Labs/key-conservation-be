const TABLE_NAME = 'comments';

// COMPLETED

exports.seed = (knex, Promise) => {
  return knex(TABLE_NAME)
    .del()
    .then(() => knex(TABLE_NAME).insert([

        {
          user_id: 3,
          campaign_id: 2,
          created_at: '2020-02-28 10:50:33.930476-06',
          body: 'Comments',
        },
        {
          user_id: 10,
          campaign_id: 3,
          created_at: '2020-02-28 10:51:12.859842-06',
          body: 'I want to help!',
        },
        {
          user_id: 2,
          campaign_id: 3,
          created_at: '2020-02-28 10:51:37.402067-06',
          body: 'Me too',
        },
        {
          user_id: 16,
          campaign_id: 3,
          created_at: '2020-02-28 10:56:15.322716-06',
          body: 'Me three',
        },
        {
          user_id: 23,
          campaign_id: 3,
          created_at: '2020-02-28 11:19:55.519931-06',
          body: 'No',
        },
        {
          user_id: 16,
          campaign_id: 3,
          created_at: '2020-02-28 12:45:17.667843-06',
          body: ':(',
        },
        {
          user_id: 16,
          campaign_id: 4,
          created_at: '2020-02-28 14:28:14.446316-06',
          body: 'It’s because they’re so slow',
        },
        {
          user_id: 1,
          campaign_id: 5,
          created_at: '2020-02-28 16:38:44.87214-06',
          body: 'H8 that I cannot like this post when it is very much liked',
        },
        {
          user_id: 39,
          campaign_id: 6,
          created_at: '2020-03-02 12:12:19.474133-06',
          body: 'Totally dude',
        },
        {
          user_id: 7,
          campaign_id: 4,
          created_at: '2020-03-02 14:19:45.296658-06',
          body: 'I like sloths.',
        },
        {
          user_id: 39,
          campaign_id: 6,
          created_at: '2020-03-02 14:30:13.081085-06',
          body: 'Wait lol this is ME',
        },
        {
          user_id: 76,
          campaign_id: 7,
          created_at: '2020-03-02 16:06:35.948561-06',
          body: '?',
        },
        {
          user_id: 29,
          campaign_id: 8,
          created_at: '2020-03-02 17:57:27.254665-06',
          body: 'Oh',
        },
        {
          user_id: 76,
          campaign_id: 8,
          created_at: '2020-03-05 20:09:39.428542-06',
          body: 'Test',
        },
        {
          user_id: 76,
          campaign_id: 8,
          created_at: '2020-03-05 20:14:13.722825-06',
          body: 'Test',
        },
        {
          user_id: 76,
          campaign_id: 8,
          created_at: '2020-03-05 20:14:28.314292-06',
          body: 'Otro test',
        },
        {
          user_id: 76,
          campaign_id: 8,
          created_at: '2020-03-05 20:19:33.149503-06',
          body: 'Again? :D',
        },
        {
          user_id: 76,
          campaign_id: 8,
          created_at: '2020-03-05 20:19:52.56339-06',
          body: 'Wow',
        },
        {
          user_id: 76,
          campaign_id: 8,
          created_at: '2020-03-05 20:20:03.670252-06',
          body: 'This is awsome',
        },
        {
          user_id: 76,
          campaign_id: 8,
          created_at: '2020-03-05 20:20:57.83725-06',
          body: 'Testing',
        },
        {
          user_id: 76,
          campaign_id: 8,
          created_at: '2020-03-05 20:35:41.25934-06',
          body: 'Again',
        },
        {
          user_id: 33,
          campaign_id: 8,
          created_at: '2020-03-23 17:19:19.47652-05',
          body: 'Testing new button',
        },
        {
          user_id: 39,
          campaign_id: 8,
          created_at: '2020-03-24 12:33:09.637764-05',
          body: 'This is a comment',
        },
        {
          user_id: 33,
          campaign_id: 8,
          created_at: '2020-03-24 14:27:55.808544-05',
          body: 'Test again',
        },
        {
          user_id: 76,
          campaign_id: 8,
          created_at: '2020-03-26 14:26:44.523458-05',
          body: 'sumeet',
        },
        {
          user_id: 76,
          campaign_id: 8,
          created_at: '2020-03-26 14:28:37.993114-05',
          body: 'sumeet',
        },
        {
          user_id: 76,
          campaign_id: 8,
          created_at: '2020-03-26 14:29:18.977085-05',
          body: 'sumeet',
        },
        {
          user_id: 76,
          campaign_id: 8,
          created_at: '2020-03-26 14:29:47.670275-05',
          body: 'sumeet',
        },
        {
          user_id: 76,
          campaign_id: 8,
          created_at: '2020-03-26 14:30:42.251688-05',
          body: 'sumeet',
        },
        {
          user_id: 76,
          campaign_id: 8,
          created_at: '2020-03-26 14:31:05.67129-05',
          body: 'sumeet',
        },
        {
          user_id: 76,
          campaign_id: 8,
          created_at: '2020-03-26 14:31:44.907753-05',
          body: 'sumeet',
        },
        {
          user_id: 58,
          campaign_id: 10,
          created_at: '2020-03-26 14:51:45.154323-05',
          body: 'Comment',
        },
        {
          user_id: 58,
          campaign_id: 9,
          created_at: '2020-03-26 14:52:03.219757-05',
          body: 'New comment',
        },
        {
          user_id: 58,
          campaign_id: 9,
          created_at: '2020-03-26 15:05:39.339176-05',
          body: 'This Doggo is kewl',
        },
        {
          user_id: 58,
          campaign_id: 8,
          created_at: '2020-03-26 15:05:59.058634-05',
          body: 'Katie',
        },
        {
          user_id: 46,
          campaign_id: 11,
          created_at: '2020-03-27 17:18:19.195052-05',
          body: 'This is amazing',
        },
        {
          user_id: 54,
          campaign_id: 11,
          created_at: '2020-03-27 20:59:43.277663-05',
          body: 'How much',
        },
        {
          user_id: 54,
          campaign_id: 14,
          created_at: '2020-04-07 14:29:54.881749-05',
          body: 'We were forced to close too! Crazy times',
        },
        {
          user_id: 29,
          campaign_id: 14,
          created_at: '2020-04-07 15:21:00.628775-05',
          body: 'I will miss the gators',
        },
        {
          user_id: 33,
          campaign_id: 14,
          created_at: '2020-04-07 15:25:36.564257-05',
          body: 'Test',
        },
        {
          user_id: 31,
          campaign_id: 14,
          created_at: '2020-04-07 15:26:05.109724-05',
          body: 'Test',
        },
        {
          user_id: 29,
          campaign_id: 14,
          created_at: '2020-04-08 11:31:01.253531-05',
          body:
            'Much evil soon high in hope do view. Out may few northward believing attempted. Yet timed being songs marry one defer men our. Although finished blessing do of. Consider speaking me prospect whatever if. Ten nearer rather hunted six parish indeed number. Allowance repulsive sex may contained can set suspected abilities cordially. Do part am he high rest that. So fruit to ready it being views match.',
        },
        {
          user_id: 59,
          campaign_id: 14,
          created_at: '2020-04-08 13:11:01.060361-05',
          body: 'So sad, I wanted to see your albino alligators!',
        },
        {
          user_id: 30,
          campaign_id: 14,
          created_at: '2020-04-08 13:14:04.984082-05',
          body: 'We all need to stay safe, including these guys! See you soon',
        },
        {
          user_id: 81,
          campaign_id: 14,
          created_at: '2020-04-08 13:16:57.685556-05',
          body:
            'When you guys re-open, I will be the first to hop into my Jeep and make a drive from Nashville!',
        },
        {
          user_id: 47,
          campaign_id: 13,
          created_at: '2020-04-08 14:37:06.927116-05',
          body: 'We support this message!',
        },
        {
          user_id: 55,
          campaign_id: 15,
          created_at: '2020-04-08 15:01:42.285088-05',
          body: 'We are here to help! :)',
        },
        {
          user_id: 56,
          campaign_id: 12,
          created_at: '2020-04-08 15:38:15.125757-05',
          body: 'Plants rule and dogs.. wait',
        },
        {
          user_id: 57,
          campaign_id: 16,
          created_at: '2020-04-08 15:48:56.687436-05',
          body: 'We have free bat tshirts for your meetup!',
        },
        {
          user_id: 57,
          campaign_id: 12,
          created_at: '2020-04-09 10:13:46.314934-05',
          body: 'Fish is so in right now',
        },
        {
          user_id: 45,
          campaign_id: 17,
          created_at: '2020-04-09 10:50:02.459319-05',
          body: 'Looking forward to learning more about these animals!',
        },
        {
          user_id: 54,
          campaign_id: 17,
          created_at: '2020-04-24 17:30:32.105074-05',
          body:
            'We would love to collaborate on a educational blog post, send us a DM',
        },
        {
          user_id: 23,
          campaign_id: 9,
          created_at: '2020-05-08 02:06:37.796968-05',
          body: 'Test',
        },
        {
          user_id: 84,
          campaign_id: 19,
          created_at: '2020-05-18 09:07:29.520371-05',
          body: 'Hi',
        },
        {
          user_id: 76,
          campaign_id: 20,
          created_at: '2020-05-18 13:38:38.135894-05',
          body: 'Yay',
        },
        {
          user_id: 44,
          campaign_id: 19,
          created_at: '2020-05-18 17:52:23.85787-05',
          body: 'Test',
        },
        {
          user_id: 59,
          campaign_id: 20,
          created_at: '2020-05-18 18:21:46.956803-05',
          body: 'Hey!',
        },
        {
          user_id: 30,
          campaign_id: 20,
          created_at: '2020-05-18 18:24:52.954368-05',
          body: 'Cool',
        },
        {
          user_id: 30,
          campaign_id: 20,
          created_at: '2020-05-18 18:30:25.594772-05',
          body: 'Testing',
        },
        {
          user_id: 44,
          campaign_id: 23,
          created_at: '2020-05-30 19:35:53.254567-05',
          body: "they're even cooler when they work",
        },
      ]));

};
