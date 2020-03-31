export function fetchTweet(type) {
    return axios.get(`/api/tweets?type=${type}`);
}

export function fetchComments(id) {
    return axios.get(`/api/comments/${id}`);
}

export function fetchUser(username) {
    return axios.get(`/api/user/${username}`);
}

export function recordComment(comment) {
    return axios.post('/api/comments', comment);
}

export function recordVote(item, type) {
    return axios.post('/api/votes', {tweet: item.id, type});
}

export function recordTweet(tweet) {
    return axios.post('/api/tweets/', tweet);
}

