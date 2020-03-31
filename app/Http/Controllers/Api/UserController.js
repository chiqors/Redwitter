'use strict';

const User = use('App/Model/User');
const UserRepository = make('App/Repositories/User');

class UserController {
    /**
     * show the user
     *
     * @param  {Object} request
     * @param  {Object} response
     */
    * show (request, response) {
        const user = yield UserRepository.byUsername(request.param('username'));

        response.json(user);
    }
}

module.exports = UserController;
