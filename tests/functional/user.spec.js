'use strict';

const chai = require('chai');
const request = require('supertest');
const assert = chai.assert;
const baseUrl = `http://${process.env.HOST}:${process.env.PORT}/`;
require('co-mocha');

describe('User', function () {
    afterEach(function * () {
        const Db = use('Database');
        yield Db.truncate('users');
    });

    it('should throw validation error when user email is missing', function * () {
        const response = yield request(baseUrl)
            .post('register')
            .expect(302);

        assert.equal(response.header.location, 'register');
    });

    it('should throw validation error when user email is invalid', function * () {
        const response = yield request(baseUrl)
            .post('register')
            .send({email: 'foo'})
            .expect(302);

        assert.equal(response.header.location, 'register');
    });

    it('should throw validation error when user password is missing', function * () {
        const response = yield request(baseUrl)
            .post('register')
            .send({email: 'user@example.com'})
            .expect(302);

        assert.equal(response.header.location, 'register');
    });

    it('should throw validation error when user email address has already been taken', function * () {
        const user = use('Factory').model('App/Model/User').make();
        yield user.save();
        const response = yield request(baseUrl)
            .post('register')
            .send({email: user.email, password: 'password'})
            .expect(302);

        assert.equal(response.header.location, 'register');
    });
});
