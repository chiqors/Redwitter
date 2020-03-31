import * as actions from '../actions';
import { combineReducers } from 'redux';

const tweetList = (state = {
    items: []
}, action) => {
    switch (action.type) {
    case actions.REQUEST_ITEM_LIST:
        return {
            ...state,
            items: [],
            isLoading: true
        };
    case actions.RECEIVE_NEW:
    case actions.RECEIVE_TOP:
        return {
            ...state,
            items: action.items,
            isLoading: false,
            receiveDate: action.receiveDate
        };
    case actions.RECEIVE_TWEET:
        return {
            ...state,
            items: [...state.items, action.tweet],
        };
    default:
        return state;
    }
};

const comments = (state = {
    ...state,
    comments: [],
    isLoading: true
}, action) => {
    switch (action.type) {
    case actions.RECEIVE_COMMENTS:
        return {
            ...state,
            comments: action.comments,
            isLoading: false,
            receiveDate: action.receiveDate
        };
    case actions.RECEIVE_COMMENT:
        return {
            ...state,
            comments: [...state.comments, action.comment],
        };
    default:
        return state;
    }
};

const user = (state = {
    ...state,
    user: null,
    isLoading: true
}, action) => {
    switch (action.type) {
    case actions.RECEIVE_USER:
        return {
            ...state,
            user: action.user,
            isLoading: false,
            receiveDate: action.receiveDate
        };
    default:
        return state;
    }
};

export default combineReducers({
    tweetList,
    comments,
    user
});
