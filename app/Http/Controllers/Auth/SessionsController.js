'use strict';

const User = use('App/Model/User');

class SessionsController {
    /**
     * show login form
     *
     * @param  {Object} request
     * @param  {Object} response
     */
    * show (request, response) {
        yield response.sendView('login');
    }

    /**
     * logs a user in
     *
     * @param  {Object} request
     * @param  {Object} response
     */
    * store (request, response) {
        const email = request.input('email');
        const password = request.input('password');

        try {
            const login = yield request.auth.attempt(email, password);
            response.redirect('/');
        } catch (e) {
            yield request.with({danger: e.message}).flash();
            response.redirect('back');
            return;
        }
    }

    * destroy (request, response) {
        yield request.auth.logout();
        response.redirect('/');
    }

}

module.exports = SessionsController;
