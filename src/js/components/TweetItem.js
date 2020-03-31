import React from 'react';
import url from 'url';
import { Link } from 'react-router';
import Moment from 'moment';
import 'moment-timezone';

class TweetItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            upvoted: this.props.item.upvoted,
            downvoted: this.props.item.downvoted,
            score: this.props.item.upvotes_count - this.props.item.downvotes_count
        };
    }

    showLoginError() {
        swal({
            title: 'Error!',
            text: 'You must login to vote',
            type: 'error',
            confirmButtonText: 'Okay'
        });
    }

    upvote() {
        if (this.state.upvoted) return;
        if (! App.loggedIn) return this.showLoginError();

        this.setState({ upvoted: true, downvoted: false, score: this.state.score + 1});
        this.props.vote(this.props.item, 'up');
    }

    downvote() {
        if (this.state.downvoted) return;
        if (! App.loggedIn) return this.showLoginError();

        this.setState({ upvoted: false, downvoted: true, score: this.state.score - 1});
        this.props.vote(this.props.item, 'down');
    }

    getVotes() {
        const { item } = this.props;

        const className = do {
            if(this.state.upvoted) {
                'c-tweet__votes c-tweet__votes--upvoted';
            } else if (this.state.downvoted) {
                'c-tweet__votes c-tweet__votes--downvoted';
            } else {
                'c-tweet__votes';
            }
        };

        return (
            <div class="column is-2-mobile is-1-tablet ">
                <div class={className}>
                    <a class="c-tweet__arrow c-tweet__arrow--up" onClick={() => this.upvote()}>
                        <i class="fa fa-arrow-up" aria-hidden="true"></i>
                    </a>
                    <span class="c-tweet__score">
                        {this.state.score}
                    </span>
                    <a class="c-tweet__arrow c-tweet__arrow--down" onClick={() => this.downvote()}>
                        <i class="fa fa-arrow-down" aria-hidden="true"></i>
                    </a>
                </div>
            </div>
        );
    }

    getAvatar() {
        const { item } = this.props;
        return (
            <div class="column is-3-mobile is-1-tablet">
                <img class="c-tweet_image" src={item.tweet_avatar} />
            </div>
        );
    }

    getContent() {
        const { item } = this.props;
        const date = Moment(`${item.created_at}z`).tz("America/New_York").fromNow(true);

        return (
            <div class="column">
                <a class="c-tweet__title" href={item.link} target="_blank">
                    {item.title}
                </a>

                <div class="c-tweet__meta">
                    submitted {date} ago by&nbsp;
                    <Link to={`/u/${item.user.username}`} class="c-tweet__author">
                        {item.user.username}
                    </Link>
                </div>

                <Link to={`/comments/${item.id}`} class="c-tweet__links">
                    {item.comments_count} comments
                </Link>
            </div>
        );
    }

    render() {
        return (
            <div class="c-tweet">
                <div class="columns is-mobile">
                    {this.getVotes()}
                    {this.getAvatar()}
                    {this.getContent()}
                </div>
            </div>
        );
    }
}

export default TweetItem;
