'use strict';

const Exceptions = use('App/Exceptions');

class Vote {
    /**
     * array of dependencies to be injected to the class instance
     * This is done automatically by IoC container.
     *
     * @return {Array}
     */
    static get inject () {
        return ['App/Model/Vote'];
    }

    constructor (Vote) {
        this.Vote = Vote;
    }

    /**
     * Adding a new question by associating a given tweet
     * and user.
     *
     * @param {String} type
     * @param {Object} tweet
     * @param {Object} user
     * @return {Object}
     */
    * store (type, tweet, user) {
        const vote = new this.Vote();
        vote.upvote = (type == 'up' ? true : false);

        // Delete votes by this user on this tweet
        yield this.Vote
            .query()
            .where('tweet_id', tweet.id)
            .where('user_id', user.id)
            .delete();

        vote.tweet().associate(tweet);
        vote.user().associate(user);

        yield vote.save();

        return vote;
    }

}

module.exports = Vote;
