'use strict';

const Comment = use('App/Model/Comment');
const CommentRepository = make('App/Repositories/Comment');
const TweetRepository = make('App/Repositories/Tweet');

class CommentController {
    /**
     * show the comments for a given tweet id
     *
     * @param  {Object} request
     * @param  {Object} response
     */
    * show (request, response) {
        const tweet = yield TweetRepository.find(request.param('id'));
        const comments = yield CommentRepository.forTweet(tweet);

        response.json(comments);
    }

    /**
     * creates a new comment
     *
     * @param  {Object} request
     * @param  {Object} response
     */
    * store (request, response) {
        const comment = request.only('body', 'tweet_id');

        const tweet = yield TweetRepository.find(comment.tweet_id);
        const newComment = yield CommentRepository.store(comment.body, tweet, request.authUser);
        yield newComment.related('user').load();

        response.json(newComment);
    }

}

module.exports = CommentController;
