import React, {Component} from 'react'
import ReactDOM from 'react-dom'

import {
    HashRouter as Router,
    Redirect
} from 'react-router-dom'






class App extends Component {
    render (){
        return (
            <Router>
                <Redirect to={{
                  pathname: '/login',
                  search: '?utm=your+face'
                }}/>   
            </Router>
        )
    }
}



ReactDOM.render(<App/>, document.getElementById('app'))