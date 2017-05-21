import { createStore, combineReducers } from 'redux'
import fetch from 'isomorphic-fetch'
import 'babel-polyfill'

//subreddit是社交新闻网站Reddit的子版块
//相当于腾讯新闻的一个子频道(社会， NBA等)

//用户操作的action

//选择子频道 及action creator
const SELECT_SUBREDDIT = 'SELECT_SUBREDDIT'
const selectSubreddit = (subreddit)=>{
    return {
        type: SELECT_SUBREDDIT,
        subreddit
    }
}

const INVALIDATE_SUBREDDIT = 'INVALIDATE_SUBREDDIT'
const invalidateSubreddit = (subreddit)=>{
    return {
        type: INVALIDATE_SUBREDDIT,
        subreddit
    }
}

//网络请求来控制的action

//请求开始
const REQUEST_POSTS = 'REQUEST_POSTS'
const requestPosts = (subreddit)=>{
    return {
        type: REQUEST_POSTS,
        subreddit
    }
}

//收到响应
const RECEIVE_POSTS = 'RECEIVE_POSTS'
const receivePosts = (subreddit, data)=>{
    return {
        type: RECEIVE_POSTS,
        subreddit,
        posts: data,
        receivedAt: Date.now()
    }
}

const initState = {
    selectedsubreddit: '',
    postsBySubreddit: {
        fontEnd: {
            //表示是否在请求
            isFetch: false,
            //表示数据是否过期
            didInvalidate: false,
            items: []
        },
        reactjs: {
            isFetch: false,
            didInvalidate: false,
            //更新时间
            lastUpdated: 1439478405547,
            items: [
                {
                  id: 42,
                  title: 'Confusion about Flux and Relay'
                },
                {
                  id: 500,
                  title: 'Creating a Simple Application Using React JS and Flux Architecture'
                }
            ]
        }
    }
}

const selectedsubreddit = (state, action)=>{
    const {type, subreddit} = action
    switch(type){
        case SELECT_SUBREDDIT:
            return  subreddit
        default: return state
    }
}

const posts = (state={
    isFetch: false,
    didInvalidate: false,
    items: []
}, action)=>{
    switch(action.type){
        case INVALIDATE_SUBREDDIT:
            return Object.assign({}, state, {
                didInvalidate: true
            })
        case REQUEST_POSTS:
            return Object.assign({}, state, {
                isFetch: true,
                didInvalidate: false
            })
        case RECEIVE_POSTS:
            return Object.assign({}, state, {
                isFetch: false,
                didInvalidate: false,
                items: action.posts,
                lastUpdated: action.receivedAt
            })
        default: return state
    }
}

const postsBySubreddit = (state={}, action)=>{
    //将reducer再拆分
    //{
    //     frontEnd: posts('fontEnd', action),
    //     reactjs: posts('reactjs', action)
    // }
    switch(action.type){
        case REQUEST_POSTS:
        case RECEIVE_POSTS:
        case INVALIDATE_SUBREDDIT:
            return Object.assign({}, state, {
                [action.subreddit]: posts(action.subreddit, action)
            })
        default: return state

    }
    
}

const rootReducer = (state, action)=>{
    return {
        selectedsubreddit,
        postsBySubreddit
    }
}

const store = createStore(rootReducer)
//async action creater
const fetchPosts = (subreddit)=>{
    return (dispatch, getState)=>{
        dispatch(requestPosts(subreddit))
        return fetch(`https://www.reddit.com/r/${subreddit}.json`)
            .then((response)=>{
                return response.json()
            })
            .then((json)=>{
                dispatch(receivePosts(subreddit, json))
            })
    }
}

store.dispatch(fetchPosts('reactjs'));