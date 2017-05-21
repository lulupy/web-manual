import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'

import {
    HashRouter as Router,
    Route,
    Link,
    withRouter
} from 'react-router-dom'

class Home extends Component{

    clickHandler (ev){
        ev.target.style.background = 'red'
    }
    render (){
        return (
            <div>
              <h2 onClick={this.clickHandler}>Home</h2>
            </div>
        )
    }
}

class About extends Component{

    render (){
        return (
            <div>
              <h2>About</h2>
            </div>
        )
    }
}

class App extends Component {
    render (){
        return (
            <Router>
                <div>
                    <Route path="/" render={props=><Home {...props}/>}></Route>
                    <Route path="/about" component={About}></Route>
                </div>
            </Router>
        )
    }
}



ReactDOM.render(<App/>, document.getElementById('app'))