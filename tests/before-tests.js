'use strict';

const Config = use('Config')


/*
|--------------------------------------------------------------------------
| Before Tests
|--------------------------------------------------------------------------
|
| This file will be executed before running all the tests
|
*/

const Ioc = use('adonis-fold').Ioc;

/**
 * override the hash provider for faster tests, since
 * bcrypt is a slow algo.
 */
Ioc.bind('Adonis/Src/Hash', function () {
    return {
        verify: function * (value, oldValue) {
            return value === oldValue;
        },
        make: function * (value) {
            return value;
        }
    };
});

// Disable CSRF
Config.set('shield.csrf.enable', false);

// Set JWT Auth
Config.set('auth.authenticator', 'jwt');
