import { fetchTweet, fetchComments, fetchUser, recordVote, recordComment, recordTweet } from '../api';

const MAX_THREAD_NUMBER = 30;
export const REQUEST_ITEM_LIST = 'REQUEST_TWEET_LIST';
export const RECEIVE_NEW = 'RECEIVE_NEW';
export const RECEIVE_TOP = 'RECEIVE_TOP';
export const RECEIVE_USER = 'RECEIVE_USER';
export const RECEIVE_COMMENTS = 'RECEIVE_COMMENTS';
export const RECEIVE_COMMENT = 'RECEIVE_COMMENT';
export const RECEIVE_VOTE = 'RECEIVE_VOTE';
export const RECEIVE_TWEET = 'RECEIVE_TWEET';
export const NEW = 'NEW';
export const TOP = 'TOP';

function getApiUrlByItemType (type) {
    switch (type) {
    case NEW:
        return 'new';
    case TOP:
    default:
        return 'top';
    }
}

function getReceiveTypeByItemType (type) {
    switch (type) {
    case NEW:
        return RECEIVE_NEW;
    case TOP:
    default:
        return RECEIVE_TOP;
    }
}

export const requestItemList = () => {
    return {
        type: REQUEST_ITEM_LIST
    };
};

export const receiveTweets = (items, type) => {
    return {
        type: getReceiveTypeByItemType(type),
        items,
        receiveDate: Date.now()
    };
};

export const receiveComments = (comments) => {
    return {
        type: RECEIVE_COMMENTS,
        comments: comments,
        receiveDate: Date.now()
    };
};

export const receiveVote = (result) => {
    return {
        type: VOTE_SAVED,
        result: result,
    };
};

export const receiveComment = (comment) => {
    return {
        type: RECEIVE_COMMENT,
        comment: comment,
    };
};

export const receiveUser = (user) => {
    return {
        type: RECEIVE_USER,
        user,
        receiveDate: Date.now()
    };
};

export const receiveTweet = (tweet) => {
    return {
        type: RECEIVE_TWEET,
        tweet,
        receiveDate: Date.now()
    };
};

export const requestTweets = type => dispatch => {
    dispatch(requestItemList());

    return fetchTweet(getApiUrlByItemType(type))
        .then(({data}) => {
            dispatch(receiveTweets(data, type));
        });
};

export const requestComments = (id) => dispatch => {
    return fetchComments(id)
        .then(({data}) => {
            dispatch(receiveComments(data));
        });
};

export const requestUser = (username) => dispatch => {
    return fetchUser(username)
        .then(({data}) => {
            dispatch(receiveUser(data));
        });
};

export const voteOnTweet = (item, type) => dispatch => {
    return recordVote(item, type)
        .then(({data}) => {
            dispatch(receiveVote(data));
        });
};

export const addComment = (comment) => dispatch => {
    return recordComment(comment)
        .then(({data}) => {
            dispatch(receiveComment(data));
        });
};

export const submitTweet = (tweet) => dispatch => {
    return recordTweet(tweet)
        .then(({data}) => {
            dispatch(receiveTweet(data));
        });
};
