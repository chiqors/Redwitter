'use strict';

const Lucid = use('Lucid');

class Comment extends Lucid {

    /**
     * relationship with tweet
     *
     * @return {Object} Instance of belongsTo relation
     */
    tweet () {
        return this.belongsTo('App/Model/Tweet');
    }

    /**
     * relationship with user
     *
     * @return {Object} Instance of belongsTo relation
     */
    user () {
        return this.belongsTo('App/Model/User');
    }

}

module.exports = Comment;
