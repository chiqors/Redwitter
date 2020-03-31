import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import { createStore, applyMiddleware } from 'redux';
import tweetList from './reducers';

const loggerMiddleware = createLogger();

const store = createStore(
    tweetList,
    applyMiddleware(
        thunkMiddleware,
        loggerMiddleware
    )
);

export default store;
