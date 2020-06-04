exports.seed = (knex, Promise) => {

    return knex('users').insert(
        {
            // newid: 1
            // id: '22',
            sub: 'auth0|5e5930485174b61780a191412sdafsdafdfsadfsa',
            email: 'katiefelten+new2@gmail.com',
            profile_image:
              'https://keyconservation.s3.us-west-1.amazonaws.com/files/1582929414548_photo.jpg',
            created_at: '2020-02-28 12:45:20.244776-06',
            location: 'Atlanta, Georgia',
            mini_bio:
              'Some bears cannot bear to not bear as long as they intended to bear',
            species_and_habitats: '',
            twitter: '',
            facebook: '',
            instagram: '',
            phone_number: '43553',
            roles: 'conservationist',
            admin: 'f',
            is_deactivated: 'f',
            deactivated_at: '2020-02-28 12:45:20.244776-06',
            strikes: 1,
            full_text_weighted: "'katiefelten':1A 'new2@gmail.com':2A",
            accepting_help_requests: 'f',
          }
    );

};