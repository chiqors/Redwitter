import React from 'react';
import Comment from './Comment';
import Spinner from './Spinner';
import NewComment from './NewComment';

const CommentList = ({comments, isLoading, newComment}) => {

    const addComment = () => {
        if (window.App.loggedIn) {
            return (
                <NewComment newComment={newComment}/>
            );
        }

        return (
            <div class="u-m-y-2">
                <strong>Please <a href="/login">login</a> to leave a comment.</strong>
            </div>
        );
    };

    return (
        <section class="section c-comment-listing">
            <div class="container">
                { isLoading &&
                    <Spinner /> }

                {comments.comments.length > 0 ? comments.comments.map((comment, index) => {
                    return <Comment key={comment.id} comment={comment} />;
                }) : <h2 class="u-m-b-2">No Comments</h2>}

                {addComment()}
            </div>
        </section>
    );
};

export default CommentList;
