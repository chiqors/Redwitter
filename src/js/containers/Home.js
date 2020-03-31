import React from 'react';
import { connect } from 'react-redux';
import Header from '../components/Header';
import { requestTweets } from '../actions';

const Home = ({children, updateView}) => {
    return (
        <div>
            <Header title="What's happening?" updateView={updateView} />
            {children}
        </div>
    );
};

const mapDispatchToProp = (dispatch) => {
    return {
        updateView: (e) => {
            const type = e.target.href.split('/').slice(-1)[0].toUpperCase();
            dispatch(requestTweets(type.toUpperCase()));
        }
    };
};

export default connect(null, mapDispatchToProp)(Home);
