'use strict';

class Guest {
    /**
     * Only allow guest to pass through middleware
     *
     * @param  {Object} request
     * @param  {Object} response
     * @param  {Function} next
     */
    * handle (request, response, next) {
        const isLoggedIn = yield request.auth.check();

        if (isLoggedIn) {
            return response.redirect('/');
        }

        yield next;
    }

}

module.exports = Guest;
