import React from 'react';
import { Link } from 'react-router';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import Spinner from './Spinner';

const User = ({user, isLoading, updateView}) => {

    const userContent = () => {
        return (
            <div>

                <Tabs class="c-tabs">
                    <div class="tabs">
                        <TabList>
                            <Tab selectedClassName="is-active"><a>Tweets</a></Tab>
                            <Tab selectedClassName="is-active"><a>Comments</a></Tab>
                            <Tab selectedClassName="is-active"><a>Friends</a></Tab>
                            <Tab selectedClassName="is-active"><a>Frenemies</a></Tab>
                        </TabList>
                    </div>

                    <TabPanel>
                        {userTweets()}
                    </TabPanel>

                    <TabPanel>
                        {userComments()}
                    </TabPanel>

                    <TabPanel>
                        {userFriends()}
                    </TabPanel>

                    <TabPanel>
                        {userFrenemies()}
                    </TabPanel>
                </Tabs>
            </div>
        );
    };

    const userTweets = () => {
        return (
            <ul>
                {user.tweets.map(tweet => {
                    return (
                        <li class="u-m-y-1">
                            <Link key={tweet.id} class="" to={`/comments/${tweet.id}`}>
                                {tweet.title}
                            </Link>
                        </li>
                    );
                })}
            </ul>
        );
    };

    const userComments = () => {
        return (
            <ul>
                {user.comments.map(comment => {
                    return (
                        <li class="u-m-y-1">
                            "{comment.body}" on &nbsp;
                            <Link key={comment.id} class="" to={`/comments/${comment.tweet.id}`}>
                                {comment.tweet.title}
                            </Link>
                        </li>
                    );
                })}
            </ul>
        );
    };

    const userFriends = () => {
        return (
            <ul>
                {user.friends.map(user => {
                    return (
                        <li class="u-m-y-1">
                            <Link key={user.id} class="" to={`/u/${user.username}`} onClick={updateView}>
                                {user.username}
                            </Link>
                        </li>
                    );
                })}
            </ul>
        );
    };

    const userFrenemies = () => {
        return (
            <ul>
                {user.frenemies.map(user => {
                    return (
                        <li class="u-m-y-1">
                            <Link key={user.id} class="" to={`/u/${user.username}`} onClick={updateView}>
                                {user.username}
                            </Link>
                        </li>
                    );
                })}
            </ul>
        );
    };

    const userSidebar = () => {
        return (
            <div class="c-user__score">
                <div class="level">
                    <div class="level-item has-text-centered">
                        <div>
                            <p class="heading">Karma</p>
                            <p class="title">{user.karma}</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    const renderUser = () => {
        return (
            <section class="section c-user">
                <div class="container">
                    <h1 class="title">{user.username}</h1>

                    <div class="columns u-m-t-3">
                        <div class="column is-two-thirds">
                            {userContent()}
                        </div>
                        <div class="column">
                            {userSidebar()}
                        </div>
                    </div>
                </div>
            </section>
        );
    };

    return (
        <div>
            { isLoading && <Spinner /> }
            { user && renderUser()}
        </div>
    );
};

export default User;
