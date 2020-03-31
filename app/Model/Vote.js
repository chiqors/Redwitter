'use strict';

const Lucid = use('Lucid');

class Vote extends Lucid {

    /**
    * rules to be used for validation
    *
    * @return {Object}
    */
    static get rules () {
        return {
            tweet: 'required|numeric',
            type: 'required'
        };
    }

    /**
     * relationship with a tweet
     *
     * @return {Object} Instance of belongsTo relation
     */
    tweet () {
        return this.belongsTo('App/Model/Tweet');
    }

    /**
     * relationship with a user
     *
     * @return {Object} Instance of belongsTo relation
     */
    user () {
        return this.belongsTo('App/Model/User');
    }
}

module.exports = Vote;
