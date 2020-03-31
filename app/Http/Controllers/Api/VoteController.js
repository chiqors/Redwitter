'use strict';

const Vote = use('App/Model/Vote');
const Validator = use('Validator');
const VoteRepository = make('App/Repositories/Vote');
const TweetRepository = make('App/Repositories/Tweet');

class VoteController {
    /**
    * creates a new vote
    *
    * @param  {Object} request
    * @param  {Object} response
    */
    * store (request, response) {
        const vote = request.only('tweet', 'type');
        yield Validator.validate(vote, Vote.rules);

        const tweet = yield TweetRepository.find(vote.tweet);
        const newVote = yield VoteRepository.store(vote.type, tweet, request.authUser);

        response.json(newVote);
    }

}

module.exports = VoteController;
