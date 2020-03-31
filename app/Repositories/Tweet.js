'use strict';

const Exceptions = use('App/Exceptions');

class Tweet {

    /**
     * array of dependencies to be injected to the class instance
     * This is done automatically by IoC container.
     *
     * @return {Array}
     */
    static get inject () {
        return ['App/Model/Tweet'];
    }

    constructor (Tweet) {
        this.Tweet = Tweet;
    }

    /**
     * Adding a new comment by associating a given tweet
     * and user.
     *
     * @param {String} title
     * @param {String} link
     * @param {Object} user
     * @return {Object} saved tweet lucid instance
     */
    * store (title, link, user) {
        const tweet = new this.Tweet();
        tweet.title = title;
        tweet.link = link;
        tweet.tweet_avatar = yield this.avatar(link);
        tweet.user().associate(user);

        yield tweet.save();

        if (tweet.isNew()) {
            throw new Exceptions.ApplicationException('Unable to save tweet', 500);
        }

        return tweet;
    }

    /**
    * Fetches top tweets
    *
    * @return {Object} Tweet instance
    *
    * @return {Object}
    */
    * top (user) {
        const tweets = yield this.Tweet
            .query()
            .with('user', 'votes')
            .scope('votes', (builder) => {
                builder.where('user_id', user ? user.id : null);
            })
            .withCount('upvotes')
            .withCount('downvotes')
            .withCount('comments')
            .orderByRaw('upvotes_count - downvotes_count DESC')
            .fetch();

        return tweets.map(tweet => {
            const votes = tweet.relations.votes;

            if (votes.length !== 0) {
                tweet.upvoted = !! votes.first().upvote;
                tweet.downvoted = ! votes.first().upvote;
            } else {
                tweet.upvoted = false;
                tweet.downvoted = false;
            }

            return tweet;
        });
    }

    /**
    * Fetches new tweets
    *
    * @return {Object} Tweet instance
    *
    * @return {Object}
    */
    * new (user) {
        const tweets = yield this.Tweet
            .query()
            .with('user', 'votes')
            .scope('votes', (builder) => {
                builder.where('user_id', user ? user.id : null);
            })
            .withCount('upvotes')
            .withCount('downvotes')
            .withCount('comments')
            .orderBy('created_at', 'DESC')
            .fetch();

        return tweets.map(tweet => {
            const votes = tweet.relations.votes;

            if (votes.length !== 0) {
                tweet.upvoted = !! votes.first().upvote;
                tweet.downvoted = ! votes.first().upvote;
            } else {
                tweet.upvoted = false;
                tweet.downvoted = false;
            }

            return tweet;
        });
    }

  /**
   * Finds a tweet with the tweet id
   *
   * @param {Integer}
   * @return {Object}
   */
    * find (id) {
        return yield this.Tweet.find(id);
    }

    /**
     * Gets a tweet's avatar
     *
     * @param {String}
     * @return {String}
     */
    * avatar (link) {
        const username = link.match(/https:\/\/twitter.com\/(.*?)\//)[1];
        return 'https://avatars.io/twitter/' + username;
    }

}

module.exports = Tweet;
