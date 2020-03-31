'use strict';

const User = use('App/Model/User');
const Hash = use('Hash');
const Validator = use('Validator');

class RegistrationController {
    /**
     * show register page
     *
     * @param  {Object} request
     * @param  {Object} response
     */
    * show (request, response) {
        yield response.sendView('register');
    }

    /**
     * creates a new user
     *
     * @param  {Object} request
     * @param  {Object} response
     */
    * store (request, response) {
        const credentials = request.only('email', 'password', 'username');
        const validation = yield Validator.validate(credentials, User.registerRules);

        if (validation.fails()) {
            yield request.with({danger: 'Validation Failed'}).flash();
            response.redirect('register');
            return;
        }

        const user = new User();
        user.username = credentials.username;
        user.email = credentials.email;
        user.password = yield Hash.make(request.input('password'));

        yield user.save();

        yield request.with({success: 'Registration Successful! Now go ahead and login'}).flash();
        response.redirect('login');
    }

}

module.exports = RegistrationController;
