// COMPLETED
const TABLE_NAME = 'campaign_posts';
exports.seed = (knex, Promise) => {
  return knex(TABLE_NAME)
    .del()
    .then(() =>
      knex(TABLE_NAME).insert([
        {
          // newid: 1
          // id: 1,
          campaign_id: 1,
          image:
            'https://keyconservation.s3.us-west-1.amazonaws.com/files/1582902886842_photo.jpg',
          description: 'Plz save them',
          is_update: false,
          created_at: '2020-02-28T15:14:48Z',
        },
        {
          // newid: 2
          // id: 2,
          campaign_id: 2,
          image:
            'https://keyconservation.s3.us-west-1.amazonaws.com/files/1582905872430_photo.jpg',
          description: 'This is grass',
          is_update: false,
          created_at: '2020-02-28T16:04:33Z',
        },
        {
          // newid: 3
          // id: 4,
          campaign_id: 3,
          image:
            'https://keyconservation.s3.us-west-1.amazonaws.com/files/1582907153878_photo.jpg',
          description: 'These are flowers',
          is_update: false,
          created_at: '2020-02-28T16:25:57Z',
        },
        {
          // newid: 4
          // id: 5,
          campaign_id: 4,
          image:
            'https://keyconservation.s3.us-west-1.amazonaws.com/files/1582921156653_photo.png',
          description:
            'Sloths are critically endangered and a rapidly declining population. ',
          is_update: false,
          created_at: '2020-02-28T20:19:18Z',
        },
        {
          // newid: 5
          // id: 6,
          campaign_id: 5,
          image:
            'https://keyconservation.s3.us-west-1.amazonaws.com/files/1582922686380_photo.jpg',
          description:
            'This guy eats everything. Need money for vet bills 🙄🐶',
          is_update: false,
          created_at: '2020-02-28T20:44:47Z',
        },
        {
          // newid: 6
          // id: 7,
          campaign_id: 6,
          image:
            'https://keyconservation.s3.us-west-1.amazonaws.com/files/1582928874555_photo.jpg',
          description: 'No Doggo deserves to be a loaf of bread',
          is_update: false,
          created_at: '2020-02-28T22:27:55Z',
        },
        {
          // newid: 7
          // id: 8,
          campaign_id: 7,
          image:
            'https://keyconservation.s3.us-west-1.amazonaws.com/files/1583181320376_photo.jpg',
          description: 'It me',
          is_update: false,
          created_at: '2020-03-02T20:35:21Z',
        },
        {
          // newid: 8
          // id: 9,
          campaign_id: 8,
          image:
            'https://keyconservation.s3.us-west-1.amazonaws.com/files/1583191787684_photo.jpg',
          description: 'Is v important',
          is_update: false,
          created_at: '2020-03-02T23:29:49Z',
        },
        {
          // newid: 9
          // id: 10,
          campaign_id: 9,
          image:
            'https://keyconservation.s3.us-west-1.amazonaws.com/files/1585098797117_photo.jpg',
          description: 'Plz',
          is_update: false,
          created_at: '2020-03-25T01:13:20Z',
        },
        {
          // newid: 10
          // id: 11,
          campaign_id: 10,
          image:
            'https://keyconservation.s3.us-west-1.amazonaws.com/files/1585240052699_photo.jpg',
          description:
            'We have had a recent supply of farmed fish sent to Lake Clearwater which will help feed the raptors for another 3 - 4 months. ',
          is_update: false,
          created_at: '2020-03-26T16:27:33Z',
        },
        {
          // newid: 11
          // id: 13,
          campaign_id: 14,
          image:
            'https://keyconservation.s3.us-west-1.amazonaws.com/files/1586283855365_photo.jpg',
          description:
            'Due to COVID-19, we have decided to protect the safety of our guests and staff. See you soon!',
          is_update: false,
          created_at: '2020-04-07T18:24:17Z',
        },
        {
          // newid: 12
          // id: 14,
          campaign_id: 13,
          image:
            'https://keyconservation.s3.us-west-1.amazonaws.com/files/1586371716127_photo.jpg',
          description:
            'Dr. Manilal Villayate emphasized that animal testing positive cases for the virus are isolated ones. As per WHO and World Animal Health Organization there is no evidence of COVID-19 transmission from animals to humans.\n\n“All cases have been of human to animal transmission, that too, companion animals have not shown any clinical symptoms in any of the cases.\n\nAn animal can be said to have a disease only if they exhibit symptoms,” he adds. Swabs from their snouts had tested positive for the virus only due to contact with a positive human. She said however that there are always those who are ready to abandon their companion animals there are others who also genuinely care.',
          is_update: false,
          created_at: '2020-04-08T18:48:37Z',
        },
        {
          // newid: 13
          // id: 15,
          campaign_id: 15,
          image:
            'https://keyconservation.s3.us-west-1.amazonaws.com/files/1586374772095_photo.jpg',
          description:
            'At our sanctuaries in the Kimberley, AWC scientists map and analyse fire patterns each year, so we can determine the extent of both prescribed burns and uncontrolled wildfires, and investigate trends over time. This complex data is distilled into a selection of the most informative metrics (e.g. the proportion of the sanctuary burnt in the late dry season, when fires tend to be more intense, thorough, and extensive). Over many years, this type of data has helped AWC land managers hone their approach to fire management across the Kimberley, and northern Australia more broadly.',
          is_update: false,
          created_at: '2020-04-08T19:39:34Z',
        },
        {
          // newid: 14
          // id: 16,
          campaign_id: 12,
          image:
            'https://keyconservation.s3.us-west-1.amazonaws.com/files/1586376355511_photo.jpg',
          description:
            "We want to help you and your family continue to learn about coral reefs during these uncertain times. ⠀\n⠀\nWe've compiled a list of resources below to keep children and young adults educated and entertained. Check out our website at coralalliance.org.",
          is_update: false,
          created_at: '2020-04-08T20:05:57Z',
        },
        {
          // newid: 15
          // id: 17,
          campaign_id: 16,
          image:
            'https://keyconservation.s3.us-west-1.amazonaws.com/files/1586378416356_photo.jpg',
          description:
            'Back by popular demand, Friends of the Urban Forest is once again joining forces with Julia Plevin, founder of the Forest Bathing Club, to provide an immersive wander through San Francisco’s historic Presidio. While most tree tours focus on tree identification and arboricultural management, this tour is designed to brighten your spirits and ground your senses, tapping you into the healing properties of trees and the forest as a whole.',
          is_update: false,
          created_at: '2020-04-08T20:40:18Z',
        },
        {
          // newid: 16
          // id: 18,
          campaign_id: 17,
          image:
            'https://keyconservation.s3.us-west-1.amazonaws.com/files/1586379060648_photo.jpg',
          description:
            'With extremely elongated fingers and a wing membrane stretched between, the bat’s wing anatomically resembles the human hand.\n\nOver 1,200 bat species can be found worldwide, and bats make up over a fifth of all mammal species on earth. Unfortunately, bats in the United States face many threats, including climate change, habitat loss, infectious disease, and wind energy production.\n\nBat populations have declined by the millions due to the devastating impacts of white-nose syndrome, a fungal disease that infects species like the Indiana bat, northern long-eared bat, tricolored bat, and other bats that hibernate through winter in caves. Migratory bats, like the hoary bat, are not affected by white-nose syndrome but something about their migration patterns and their tree roosting lifestyle appear to put them at enhanced risk for collision with wind turbines.',
          is_update: false,
          created_at: '2020-04-08T20:51:01Z',
        },
        {
          // newid: 17
          // id: 19,
          campaign_id: 11,
          image:
            'https://keyconservation.s3.us-west-1.amazonaws.com/files/1585351735678_photo.jpg',
          description: 'He made a web',
          is_update: true,
          created_at: '2020-03-27T23:28:56Z',
        },
        {
          // newid: 18
          // id: 20,
          campaign_id: 10,
          image:
            'https://keyconservation.s3.us-west-1.amazonaws.com/files/1585501450042_photo.jpg',
          description:
            'Due to the recent fish supply, many birds are happily reproducing at a normal rate and leaving camp grounds alone.',
          is_update: true,
          created_at: '2020-03-29T17:04:11Z',
        },
        {
          // newid: 19
          // id: 21,
          campaign_id: 11,
          image:
            'https://keyconservation.s3.us-west-1.amazonaws.com/files/1586027814893_photo.jpg',
          description:
            'A new spider was born today, Cutest Boy, who will likely be the only spider to never harm a human.',
          is_update: true,
          created_at: '2020-04-04T19:16:55Z',
        },
        {
          // newid: 20
          // id: 34,
          campaign_id: 13,
          image:
            'https://keyconservation.s3.us-west-1.amazonaws.com/files/1588974971284_photo.jpg',
          description: 'This is a new update',
          is_update: true,
          created_at: '2020-05-08T21:56:12Z',
        },
        {
          // newid: 21
          // id: 178,
          campaign_id: 20,
          image:
            'https://keyconservation.s3.us-west-1.amazonaws.com/files/1589826732525_photo.jpg',
          description: 'No error pls',
          is_update: false,
          created_at: '2020-05-18T18:32:13Z',
        },
        {
          // newid: 22
          // id: 174,
          campaign_id: 14,
          image:
            'https://keyconservation.s3.us-west-1.amazonaws.com/files/1589741001646_photo.jpg',
          description:
            'We will officially open our Gator Park tomorrow on May 17th! \n\nPlease be mindful of the gators and do not pet them!',
          is_update: true,
          created_at: '2020-05-17T18:43:22Z',
        },
        {
          // newid: 23
          // id: 177,
          campaign_id: 19,
          image:
            'https://keyconservation.s3.us-west-1.amazonaws.com/files/1589746349991_photo.png',
          description:
            'Scientists agree that conserving and restoring linkages among habitat areas, as wildlife corridors do, is key to enabling plants, fish, and other animals to spread and produce more healthy populations. These linked habitats are essential for species to adapt to longer-term shifts in climate.',
          is_update: false,
          created_at: '2020-05-17T20:12:31Z',
        },
        {
          // newid: 24
          // id: 180,
          campaign_id: 21,
          image:
            'https://keyconservation.s3.us-west-1.amazonaws.com/files/1589844878480_photo.mov',
          description:
            'Desert tarantulas are on the move and we need your help protecting them. If you see a tarantula while out driving in the desert please be careful to not run it over and report where you saw it so we can map their migration routes.',
          is_update: false,
          created_at: '2020-05-18T23:35:08Z',
        },
        {
          // newid: 25
          // id: 12,
          campaign_id: 11,
          image:
            'https://keyconservation.s3.us-west-1.amazonaws.com/files/1585347295592_photo.jpg',
          description:
            'We are working on genetic analysis for this critically endangered spider species. We need to assess the wild population and then move into lab work. ',
          is_update: false,
          created_at: '2020-03-27T22:14:56Z',
        },
        {
          // newid: 26
          // id: 190,
          campaign_id: 21,
          image:
            'https://keyconservation.s3.us-west-1.amazonaws.com/files/1590884233902_photo.jpg',
          description: "they're pretty cool y'all",
          is_update: false,
          created_at: '2020-05-31T00:17:15Z',
        },
        {
          // newid: 27
          // id: 175,
          campaign_id: 18,
          image:
            'https://keyconservation.s3.us-west-1.amazonaws.com/files/1589742510769_photo.jpg',
          description:
            'Please donate for sylvesters wet food fund. He eats a lot and we keep running out. Don’t let these pictures fool you he is heavy.',
          is_update: false,
          created_at: '2020-05-17T19:08:32Z',
        },
        {
          // newid: 28
          // id: 181,
          campaign_id: 22,
          image:
            'https://keyconservation.s3.us-west-1.amazonaws.com/files/1590350976732_photo.mov',
          description:
            'As a group, raptors exhibit an extraordinary variety of hunting techniques. Aside from owls (which are sometimes considered raptors) almost all are diurnal hunters, but a few like the European Hobby (a smaller relative of the Peregrine) will pounce on mice in the moonlight. Some are like the Peregrine in that they hunt at high speed. The Sharp-shinned Hawk, for example, often flashes through relatively thick woodland, maneuvering skillfully and often snatching passerines right from their perches. Others, like American Kestrels, Black-shouldered Kites, and the young of the very successful Red-tailed Hawk, often hover when hunting, and then drop steeply down on their targets. \n\nAnd still others, including adult Red-tails, soar as they watch for prey on the ground. But most hunting by raptors probably is done from perches with a commanding view from which the bird can scan the surrounding terrain with its telescope-like vision, where it can glide rapidly to gather in its prey. Interestingly, whether an American Kestrel hovers or perch-hunts depends in large part on whether there is a good breeze to hover in. \n\nWhichever technique is used, most prey of raptors are killed by the talons of the contracting foot being driven into their bodies; if required, the hooked bill is used to give a coup-de-grace. \n\nThe exceptions are falcons, which ordinarily kill by biting into the necks of victims not dispatched in mid-air. (Owls also bite the necks of their prey.)',
          is_update: false,
          created_at: '2020-05-24T20:09:43Z',
        },
        {
          // newid: 29
          // id: 198,
          campaign_id: 24,
          image:
            'https://keyconservation.s3.us-west-1.amazonaws.com/files/1590968798281_photo.jpg',
          description: 'Amazing Campaign',
          is_update: false,
          created_at: '2020-05-31T23:46:41Z',
        },
        {
          // newid: 30
          // id: 199,
          campaign_id: 25,
          image:
            'https://keyconservation.s3.us-west-1.amazonaws.com/files/1590993357818_photo.jpg',
          description: 'Skills',
          is_update: false,
          created_at: '2020-06-01T06:36:01Z',
        },
        {
          // newid: 31
          // id: 200,
          campaign_id: 26,
          image:
            'https://keyconservation.s3.us-west-1.amazonaws.com/files/1591165482492_photo.jpg',
          description: 'Great View, need some drones\t',
          is_update: false,
          created_at: '2020-06-03T06:24:44Z',
        },
        {
          // newid: 32
          // id: 202,
          campaign_id: 27,
          image:
            'https://keyconservation.s3.us-west-1.amazonaws.com/files/1591166578133_photo.jpg',
          description: 'Some Gamers',
          is_update: false,
          created_at: '2020-06-03T06:43:00Z',
        },
      ])
    );
};
