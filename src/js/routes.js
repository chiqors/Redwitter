import React from 'react';
import { Route, IndexRoute } from 'react-router';

import Home from './containers/Home';
import TweetsContainer from './containers/TweetsContainer';
import NotFound from './containers/NotFound';
import CommentContainer from './containers/CommentContainer';
import NewTweetContainer from './containers/NewTweetContainer';
import UserContainer from './containers/UserContainer';

const routes = (
    <div>
        <Route path="/" component={Home}>
            <IndexRoute component={TweetsContainer}/>
            <Route path="top" component={TweetsContainer} />
            <Route path="new" component={TweetsContainer} />
            <Route path="submit" component={NewTweetContainer} />
            <Route path="comments/:id" component={CommentContainer} />
            <Route path="u/:username" component={UserContainer} />
        </Route>
        <Route path="*" component={NotFound} />
    </div>
);

export default routes;
