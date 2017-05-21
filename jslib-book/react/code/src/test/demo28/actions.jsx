import fetch from 'isomorphic-fetch'

const SELECT_SUBREDDIT = 'SELECT_SUBREDDIT'
const INVALIDATE_SUBREDDIT = 'INVALIDATE_SUBREDDIT'


const REQUEST_POSTS = 'REQUEST_POSTS'
const RECEIVE_POSTS = 'RECEIVE_POSTS'

function selectSubreddit(subreddit) {
  return {
    type: SELECT_SUBREDDIT,
    subreddit
  }
}
function invalidatesubreddit(subreddit) {
  return {
    type: INVALIDATE_SUBREDDIT,
    subreddit
  }
}



function requestPosts(subreddit) {
  return {
    type: REQUEST_POSTS,
    subreddit
  }
}
function receivePosts(subreddit, json) {
  return {
    type: RECEIVE_POSTS,
    subreddit,
    posts: json.data.children.map(child => child.data),
    receivedAt: Date.now()
  }
}


function fetchPosts(subreddit){
    return (dispatch)=>{
        dispatch(requestPosts(subreddit))
        return fetch(`https://www.reddit.com/r/${subreddit}.json`)
            .then(res=>res.json())
            .then(json=>dispatch(receivePosts(subreddit, json)))
    }
}

function shouldFetchPosts(state, subreddit){
    const posts = state[subreddit]
    if(!posts){
        return true
    }
    if(posts.isFetching){
        return false
    }

    return posts.didValidate
}

function fetchPostsIfNeed(subreddit){
    return function(dispatch, getState){
        if( shouldFetchPosts(getState(), subreddit) ){
            dispatch(fetchPosts(subreddit))
        }
    }
    
}

export {
    selectSubreddit,
    invalidatesubreddit,
    fetchPostsIfNeed,
    SELECT_SUBREDDIT,
    INVALIDATE_SUBREDDIT,
    REQUEST_POSTS,
    RECEIVE_POSTS

}