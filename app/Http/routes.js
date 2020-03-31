'use strict';

const Route = use('Route');

// Authentication ...
Route.get('/login', 'Auth/SessionsController.show').middleware('guest');
Route.post('/login', 'Auth/SessionsController.store').middleware('guest');
Route.get('/logout', 'Auth/SessionsController.destroy').middleware('auth');

// Registration ...
Route.get('/register', 'Auth/RegistrationController.show').middleware('guest');
Route.post('/register', 'Auth/RegistrationController.store').middleware('guest');

// API ...
Route.get('/api/tweets', 'Api/TweetController.index');
Route.post('/api/tweets', 'Api/TweetController.store').middleware('auth');
Route.get('/api/comments/:id', 'Api/CommentController.show');
Route.post('/api/comments', 'Api/CommentController.store').middleware('auth');
Route.post('/api/votes', 'Api/VoteController.store').middleware('auth');
Route.get('/api/user/:username', 'Api/UserController.show');

// Catch-all route for SPA ...
Route.get('*', 'HomeController.index');
