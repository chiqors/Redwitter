'use strict';

const Lucid = use('Lucid');
const Request = use('Adonis/Src/Request');

class Tweet extends Lucid {

    /**
     * rules to be used when validating user credentials
     * for registration
     *
     * @return {Object}
     */
    static get rules () {
        return {
            title: 'required|max:255',
            link: 'required|url',
        };
    }

    /**
     * relationship with a given user
     *
     * @return {Object} Instance of belongsTo relation
     */
    user () {
        return this.belongsTo('App/Model/User');
    }

    /**
     * relationship with votes
     *
     * @return {Object} Instance of hasMany relation
     */
    votes () {
        return this.hasMany('App/Model/Vote');
    }

    /**
     * relationship with upvotes
     *
     * @return {Object} Instance of hasMany relation
     */
    upvotes () {
        return this.hasMany('App/Model/Vote').where('upvote', true);
    }

    /**
     * relationship with downvotes
     *
     * @return {Object} Instance of hasMany relation
     */
    downvotes () {
        return this.hasMany('App/Model/Vote').where('upvote', false);
    }

    /**
     * relationship with comments
     *
     * @return {Object} Instance of hasMany relation
     */
    comments () {
        return this.hasMany('App/Model/Comment');
    }

}

module.exports = Tweet;
