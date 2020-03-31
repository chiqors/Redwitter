import React from 'react';
import { connect } from 'react-redux';
import NewTweet from '../components/NewTweet';
import { submitTweet } from '../actions';

class NewTweetContainer extends React.Component {

    constructor() {
        super();
    }

    componentDidMount() {
    }

    render() {
        return (
            <section class="section">
                <div class="container">
                    <h1 class="title">New Tweet</h1>
                    <h2 class="subtitle u-m-b-3">
                        You are submitting a tweet. The key to a successful submission is interesting content and a descriptive title.
                    </h2>
                    <NewTweet newTweet={this.props.newTweet} />
                </div>
            </section>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        newTweet: (tweet) => {
            dispatch(submitTweet(tweet))
                .then(() => {
                    window.location = '/';
                })
                .catch((error) => {
                    swal(
                        'Error',
                        'We could not submit your tweet. Try submitting a title and twitter link.',
                        'error'
                    );
                });
        }
    };
};

const mapStateToProps = (state) => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(NewTweetContainer);
