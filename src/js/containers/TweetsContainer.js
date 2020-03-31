import React from 'react';
import { connect } from 'react-redux';
import TweetList from '../components/TweetList';
import { requestTweets, voteOnTweet } from '../actions';

class TweetsContainer extends React.Component {

    constructor() {
        super();
    }

    componentDidMount() {
        const type = location.pathname.substring(1).toUpperCase();
        this.props.getTweets(type);
    }

    render() {
        const { items, isLoading, vote } = this.props;

        return (
            <div>
                <TweetList items={items} isLoading={isLoading} vote={vote} />
                { this.props.children }
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getTweets: (type) => {
            if (typeof type === 'string') {
                dispatch(requestTweets(type.toUpperCase()));
            }
        },

        vote: (tweet, type) => {
            return dispatch(voteOnTweet(tweet, type));
        }
    };
};

const mapStateToProps = (state) => {
    return {
        items: state.tweetList.items,
        isLoading: state.tweetList.isLoading,
        receiveDate: state.tweetList.receiveDate
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TweetsContainer);
