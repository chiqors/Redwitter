import React from 'react';
import { Link } from 'react-router';
import Moment from 'moment';
import 'moment-timezone';

const Comment = ({comment}) => {

    const getMeta = () => {
        const date = Moment(`${comment.created_at}z`).tz("America/New_York").fromNow(true);

        return (
            <div class="c-comment__meta">
                <Link to={`/u/${comment.user.username}`} class="c-comment__author">
                    @{comment.user.username}
                </Link>
                <small class="c-comment__date"> {date} ago</small>
            </div>
        );
    };

    const getContent = () => {
        return (
            <div class="c-comment__content">
                {comment.body}
            </div>
        );
    };

    return (
        <article class="media c-comment">
            <div class="media-content">
                <div class="content">
                    {getMeta()}
                    {getContent()}
                </div>
            </div>
        </article>
    );
};

export default Comment;
