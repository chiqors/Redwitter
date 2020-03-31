import React from 'react';
import { connect } from 'react-redux';
import { requestComments, addComment } from '../actions';
import CommentList from '../components/CommentList';

class CommentContainer extends React.Component {

    constructor() {
        super();
    }

    componentDidMount() {
        const { id } = this.props.params;
        this.props.getComments(id);
    }

    render() {
        const { comments, isLoading } = this.props;

        return (
            <div>
                <CommentList comments={comments} isLoading={isLoading} newComment={(comment) => this.props.newComment(comment, this.props.params.id)} />
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getComments: (id) => {
            if (typeof id === 'string') {
                dispatch(requestComments(id));
            }
        },

        newComment: (comment, tweet) => {
            dispatch(addComment({
                body: comment,
                tweet_id: tweet
            }));
        }
    };
};

const mapStateToProps = (state) => {
    return {
        comments: {
            comments: state.comments.comments,
            isLoading: state.comments.isLoading,
            receiveDate: state.comments.receiveDate
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(CommentContainer);
