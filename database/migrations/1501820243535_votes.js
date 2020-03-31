'use strict';

const Schema = use('Schema');

class VotesTableSchema extends Schema {

    up () {
        this.create('votes', (table) => {
            table.increments();
            table.integer('user_id').unsigned();
            table.foreign('user_id').references('users.id');
            table.integer('tweet_id').unsigned();
            table.foreign('tweet_id').references('tweets.id');
            table.boolean('upvote');
            table.timestamps();
        });
    }

    down () {
        this.drop('votes');
    }

}

module.exports = VotesTableSchema;
