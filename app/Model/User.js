'use strict';

const Lucid = use('Lucid');

class User extends Lucid {

    /**
     * fields to hide when fetch rows
     *
     * @return {Array}
     */
    static get hidden () {
        return ['password'];
    }

    /**
     * rules to be used when validating user credentials
     * for registration
     *
     * @return {Object}
     */
    static get registerRules () {
        return {
            email: 'required|email|unique:users,email',
            password: 'required',
            username: 'required|unique:users,username'
        };
    }

    /**
     * relationship with a user's tweets
     *
     * @return {Object} Instance of hasMany relation
     */
    tweets () {
        return this.hasMany('App/Model/Tweet');
    }

    /**
     * relationship with a user's votes
     *
     * @return {Object} Instance of hasMany relation
     */
    votes () {
        return this.hasMany('App/Model/Vote');
    }

    /**
     * relationship with a user's comments
     *
     * @return {Object} Instance of hasMany relation
     */
    comments () {
        return this.hasMany('App/Model/Comment');
    }

}

module.exports = User;
