import React, {Component} from 'react'
import {connect} from 'react-redux'

import {fetchPostsIfNeed} from '../actions'



class App extends Component {
    componentDidMount(){
        const {dispatch, selectedSubreddit} = this.props
        dispatch(fetchPostsIfNeed(selectedSubreddit))
    }
    render(){
        const  {
            selectedSubreddit,
            options,
            posts,
            isFetching, 
            lastUpdated 
        } = this.props
        return (
            <div>
                <span>
                    <h1>{selectedSubreddit}</h1>
                    <select>
                        {
                            options.map((option,i)=>{
                                return <option value={option} key={i}>{option}</option>
                            })
                        }
                    </select>
                </span>
                <p>
                    {lastUpdated &&
                        <span>
                        Last updated at {new Date(lastUpdated).toLocaleTimeString()}.
                        {' '}
                        </span>
                    }
                    {!isFetching &&
                        <a href="#"
                           onClick={this.handleRefreshClick}>
                          Refresh
                        </a>
                    }
                </p>
                <ul >
                    {
                        posts.map((post,i)=>{
                            return <li key={i}>{post.title}</li>
                        })
                    }
                </ul>
            </div> 
        )
    }
}

function mapStateToProps(state) {
    const {
        selectedSubreddit,
        postsBySubreddit
    } = state

    const {
        isFetching,
        lastUpdated,
        items: posts
    } = postsBySubreddit[selectedSubreddit] || {
        isFetching: true,
        items: []
    }

    console.log(posts)

    return {
        selectedSubreddit,
        isFetching,
        lastUpdated,
        posts
    }
}

export default connect(mapStateToProps)(App)