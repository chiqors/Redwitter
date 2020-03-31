'use strict';

const Schema = use('Schema');

class CommentsTableSchema extends Schema {

    up () {
        this.create('comments', (table) => {
            table.increments();
            table.integer('user_id').unsigned();
            table.foreign('user_id').references('users.id');
            table.integer('tweet_id').unsigned();
            table.foreign('tweet_id').references('tweets.id');
            table.integer('parent_id').unsigned().index().nullable();
            table.text('body');
            table.timestamps();
        });
    }

    down () {
        this.drop('comments');
    }

}

module.exports = CommentsTableSchema;
