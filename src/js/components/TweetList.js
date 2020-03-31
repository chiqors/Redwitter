import React from 'react';
import TweetItem from './TweetItem';
import Spinner from './Spinner';

const TweetList = ({items, isLoading, vote}) => {
    return (
        <section class="section c-tweet-listing">

            { isLoading &&
                <Spinner /> }

            {items.length > 0 && items.map((item, index) => {
                return <TweetItem key={item.id} item={item} rank={index + 1} vote={vote} />;
            })}

        </section>
    );
};

export default TweetList;
