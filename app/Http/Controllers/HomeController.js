'use strict';

const User = use('App/Model/User');

class HomeController {
    /**
     * show the applicaton (SPA)
     *
     * @param  {Object} request
     * @param  {Object} response
     */
    * index (request, response) {
        yield response.sendView('home');
    }

}

module.exports = HomeController;
