'use strict';

const Exceptions = use('App/Exceptions');
const Database = use('Database');

class User {
    /**
     * array of dependencies to be injected to the class instance
     * This is done automatically by IoC container.
     *
     * @return {Array}
     */
    static get inject () {
        return ['App/Model/User', 'App/Model/Comment', 'App/Model/Tweet'];
    }

    constructor (User, Comment, Tweet) {
        this.User = User;
        this.Comment = Comment;
        this.Tweet = Tweet;
    }

    /**
     * Get a user by their username
     *
     * @param {String} username
     * @return {Object} saved user lucid instance
     */
    * byUsername (username) {
        const user = yield this.User
            .query()
            .with('tweets', 'comments', 'comments.tweet')
            .where('username', username)
            .first();

        if (! user) {
            throw new Exceptions.ApplicationException('Cannot find user', 404);
        }

        user.friends = yield this.friends(user);
        user.frenemies = yield this.frenemies(user);
        user.karma = yield this.karma(user);

        return user;
    }

    /**
     * Gets a user's friends
     *
     * @param {Object} Lucid user
     * @return {Array} Friends Lucid user
     */
    * friends (user) {
        // SELECT users.* FROM tweets
        // INNER JOIN votes
        // ON tweets.id = votes.tweet_id
        // INNER JOIN users
        // ON votes.user_id = users.id
        // WHERE tweets.user_id = 10
        // AND votes.upvote = true
        // GROUP BY users.id

        return yield Database.select('users.*').from('tweets')
            .innerJoin('votes', 'tweets.id', 'votes.tweet_id')
            .innerJoin('users', 'votes.user_id', 'users.id')
            .where('tweets.user_id', user.id)
            .where('votes.upvote', true)
            .groupBy('users.id');
    }

    /**
     * Gets a user's frenemies
     *
     * @param {Object} Lucid user
     * @return {Array} Frenemies Lucid user
     */
    * frenemies (user) {
        // SELECT users.* FROM tweets
        // INNER JOIN votes
        // ON tweets.id = votes.tweet_id
        // INNER JOIN users
        // ON votes.user_id = users.id
        // WHERE tweets.user_id = 10
        // AND votes.upvote = false
        // GROUP BY users.id

        return yield Database.select('users.*').from('tweets')
            .innerJoin('votes', 'tweets.id', 'votes.tweet_id')
            .innerJoin('users', 'votes.user_id', 'users.id')
            .where('tweets.user_id', user.id)
            .where('votes.upvote', false)
            .groupBy('users.id');
    }

    /**
     * Calculates a user's karma
     *
     * @param {Object} Lucid user
     * @return {Integer}
     */
    * karma (user) {
        const tweets = yield this.Tweet
            .query()
            .withCount('upvotes')
            .withCount('downvotes')
            .where('tweets.user_id', user.id)
            .fetch();

        return tweets.reduce((sum, tweet) => {
            return sum + tweet.upvotes_count - tweet.downvotes_count;
        }, 0);
    }
}

module.exports = User;
