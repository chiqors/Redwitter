'use strict';

const Schema = use('Schema');

class TweetsTableSchema extends Schema {

    up () {
        this.create('tweets', (table) => {
            table.increments();
            table.integer('user_id').unsigned();
            table.foreign('user_id').references('users.id');
            table.string('title');
            table.string('link');
            table.string('tweet_avatar').nullable();
            table.timestamps();
        });
    }

    down () {
        this.drop('tweets');
    }

}

module.exports = TweetsTableSchema;
