'use strict';

const Tweet = use('App/Model/Tweet');
const TweetRepository = make('App/Repositories/Tweet');
const Validator = use('Validator');

class TweetController {
    /**
     * listing all tweets with the filter
     *
     * @param  {Object} request
     * @param  {Object} response
     */
    * index (request, response) {
        const filter = request.input('type', 'top');
        const tweets = yield TweetRepository[filter](request.currentUser);
        response.json(tweets);
    }

    /**
    * creates a new tweet
    *
    * @param  {Object} request
    * @param  {Object} response
    */
    * store (request, response) {
        const tweet = request.only('title', 'link');
        const validation = yield Validator.validate(tweet, Tweet.rules);

        if (validation.fails()) {
            response.status(422).json({error: validation.messages()});
            return;
        }

        // Is a tweet?
        if (! tweet.link.match(/https?:\/\/twitter.com\/(.+)/)) {
            response.status(422).json({error: 'Not a tweet'});
            return;
        }

        const newTweet = yield TweetRepository.store(tweet.title, tweet.link, request.currentUser);

        response.json(newTweet);
    }

}

module.exports = TweetController;
