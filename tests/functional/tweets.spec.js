'use strict';

const chai = require('chai');
const request = require('supertest');
const assert = chai.assert;
const co = require('co');
const Ioc = require('adonis-fold').Ioc;
const baseUrl = `http://${process.env.HOST}:${process.env.PORT}/`;
const apiUrl = `${baseUrl}api/`;
require('co-mocha');

describe('Tweet', function () {
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

    it('should get a 200 when making request to fetch all tweets', function (done) {
        request(apiUrl)
            .get('tweets')
            .expect('Content-Type', /json/)
            .expect(200, done);
    });

    it('should return the tweets when they exists', function * () {
        yield use('App/Model/Tweet').create({user_id: '1', title: 'Tweet Title', link: 'https://twitter.com/user/fake'});
        const response = yield request(apiUrl)
            .get('tweets')
            .expect('Content-Type', /json/)
            .expect(200);
        assert.isArray(response.body);
        assert.lengthOf(response.body, 1);
    });

    it('should return validation error when title is missing', function * () {
        const user = yield use('App/Model/User').find(1);
        const response = yield request(apiUrl)
            .post('tweets')
            .login(user)
            .expect('Content-Type', /json/)
            .expect(422);
    });

    it('should return validation error when link is missing', function * () {
        const user = yield use('App/Model/User').find(1);
        const response = yield request(apiUrl)
            .post('tweets')
            .login(user)
            .send({title: 'Tweet'})
            .expect('Content-Type', /json/)
            .expect(422);
    });

    it('should accept tweets', function * () {
        const user = yield use('App/Model/User').find(1);
        const response = yield request(apiUrl)
            .post('tweets')
            .login(user)
            .send({title: 'Tweet', link: 'https://twitter.com/fake/faketweetid'})
            .expect('Content-Type', /json/)
            .expect(200);

        assert.deepEqual(response.body.link, 'https://twitter.com/fake/faketweetid')
    });

    it('should not accept non-tweets', function * () {
        const user = yield use('App/Model/User').find(1);
        const response = yield request(apiUrl)
            .post('tweets')
            .login(user)
            .send({title: 'Tweet', link: 'https://facebook.com/post/fakepostid'})
            .expect('Content-Type', /json/)
            .expect(422);
    });
});
