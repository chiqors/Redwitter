'use strict';

const chai = require('chai');
const request = require('supertest');
const assert = chai.assert;
const co = require('co');
const Ioc = require('adonis-fold').Ioc;
const baseUrl = `http://${process.env.HOST}:${process.env.PORT}/`;
const apiUrl = `${baseUrl}api/`;
const requestEnd = request.Test.prototype.end
require('co-mocha');

function * getJwtToken (user) {
    const AuthManager = use('Adonis/Src/AuthManager')
    const authManager = new AuthManager(use('Adonis/Src/Config'), {})
    return yield authManager.generate(user)
}

request.Test.prototype.login = function (user, authenticator) {
    this.adonisUser = user;
    return this;
};

request.Test.prototype.end = function () {
    const self = this;
    const args = arguments;
    if (this.adonisUser) {
        return co(function * () {
            const token = yield getJwtToken(self.adonisUser);
            self.set('Authorization', `Bearer ${token}`);
            return requestEnd.apply(self, args);
        });
    }
    return requestEnd.apply(this, args)
};

describe('Comment', function () {
    before(function * () {
        yield use('App/Model/User').create({email: 'foo@bar.com', password: 'password'});
    });

    after(function * () {
        const Db = use('Database');
        yield Db.truncate('users');
    });

    afterEach(function * () {
        const Db = use('Database');
        yield Db.truncate('comments');
        yield Db.truncate('tweets');
        yield Db.truncate('votes');
    });

    it('should get a 200 when making request to fetch a tweets comments', function * () {
        const tweet = yield use('App/Model/Tweet').create({user_id: '1', title: 'Tweet Title', link: 'https://twitter.com/user/fake'});
        yield use('App/Model/Comment').create({user_id: '1', tweet_id: tweet.id, body: 'My Body'});

        const response = yield request(apiUrl)
            .get('comments/' + tweet.id)
            .expect('Content-Type', /json/)
            .expect(200);

        assert.isArray(response.body);
        assert.lengthOf(response.body, 1);
    });
});
