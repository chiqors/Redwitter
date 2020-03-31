'use strict';

const chai = require('chai');
const request = require('supertest');
const assert = chai.assert;
const co = require('co');
const Ioc = require('adonis-fold').Ioc;
const baseUrl = `http://${process.env.HOST}:${process.env.PORT}/`;
const apiUrl = `${baseUrl}api/`;
require('co-mocha');

describe('Friend', function () {
    before(function * () {
        yield use('App/Model/User').create({username: 'foo', email: 'foo@bar.com', password: 'password'});
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

    it('should be added to a user after upvote', function * () {
        const friend = use('Factory').model('App/Model/User').make();
        yield friend.save();

        const tweet = use('Factory').model('App/Model/Tweet').make();
        tweet.user_id = 1;
        yield tweet.save();

        yield request(apiUrl)
            .post('votes')
            .login(friend)
            .send({tweet: tweet.id, type: 'up'})
            .expect('Content-Type', /json/)
            .expect(200);

        const response = yield request(apiUrl)
            .get('user/foo')
            .expect('Content-Type', /json/)
            .expect(200);

        assert.isTrue(response.body.friends.length == 1);
    });

    it('should be added to frenemey after downvote', function * () {
        const friend = use('Factory').model('App/Model/User').make();
        yield friend.save();

        const tweet = use('Factory').model('App/Model/Tweet').make();
        tweet.user_id = 1;
        yield tweet.save();

        yield request(apiUrl)
            .post('votes')
            .login(friend)
            .send({tweet: tweet.id, type: 'down'})
            .expect('Content-Type', /json/)
            .expect(200);

        const response = yield request(apiUrl)
            .get('user/foo')
            .expect('Content-Type', /json/)
            .expect(200);

        assert.isTrue(response.body.frenemies.length == 1);
    });
});
