'use strict';

const Exceptions = use('App/Exceptions');

class Comment {

    /**
     * array of dependencies to be injected to the class instance
     * This is done automatically by IoC container.
     *
     * @return     {Array}
     */
    static get inject () {
        return ['App/Model/Comment', 'App/Model/Tweet'];
    }

    constructor (Comment, Tweet) {
        this.Comment = Comment;
        this.Tweet = Tweet;
    }

    /**
     * Searches for the matching comments with the tweet id
     *
     * @param {Object} tweet
     * @return {Object} saved comment lucid instance
     */
    * forTweet (tweet) {
        if (! tweet) {
            throw new Exceptions.ApplicationException('Cannot find comments for given tweet', 404);
        }

        return yield tweet.comments()
            .with('user')
            .fetch();
    }

    /**
     * Adding a new comment by associating a given tweet
     * and user.
     *
     * @param {String} body
     * @param {Object} tweet
     * @param {Object} user
     * @return {Object} saved comment lucid instance
     */
    * store (body, tweet, user) {
        const comment = new this.Comment();
        comment.body = body;

        comment.tweet().associate(tweet);
        comment.user().associate(user);

        yield comment.save();

        if (comment.isNew()) {
            throw new Exceptions.ApplicationException('Unable to save comment', 500);
        }

        return comment;
    }
}

module.exports = Comment;
