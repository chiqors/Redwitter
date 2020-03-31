'use strict';

/*
|--------------------------------------------------------------------------
| Model and Database Factory
|--------------------------------------------------------------------------
|
| Factories let you define blueprints for your database models or tables.
| These blueprints can be used with seeds to create fake entries. Also
| factories are helpful when writing tests.
|
*/

const Factory = use('Factory');

/*
|--------------------------------------------------------------------------
| User Model Blueprint
|--------------------------------------------------------------------------
| Below is an example of blueprint for User Model. You can make use of
| this blueprint inside your seeds to generate dummy data.
|
*/
Factory.blueprint('App/Model/User', (fake) => {
    return {
        username: fake.word({length: 8}),
        email: fake.email(),
        password: fake.password()
    };
});

Factory.blueprint('App/Model/Tweet', (fake) => {
    return {
        user_id: 1,
        title: fake.sentence({words: 5}),
        link: fake.url(),
        tweet_avatar: fake.avatar(),
        created_at: fake.date()
    };
});
