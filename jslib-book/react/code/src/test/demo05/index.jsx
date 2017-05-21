import React, {Component} from 'react'
import ReactDOM from 'react-dom'

import {
    HashRouter as Router,
    Route,
    Link
} from 'react-router-dom'

class Home extends Component{
    render(){
        return <div>Home</div>
    }
}

class About extends Component{
    render(){
        return <div>About</div>
    }
}

const getConfirmation = (message, callback) => {
    alert(1)
    const allowTransition = window.confirm(message)
    callback(allowTransition)
}

class App extends Component {
    render (){
        return (
            <Router basename="/basename" replace={true} getUserConfirmation={getConfirmation}>
                <div>
                    <ul>
                        <li><Link to="/home">Home</Link></li>
                        <li><Link to="/about">About</Link></li>
                    </ul>

                    <Route path="/home" component={Home}></Route>
                    <Route path="/about" component={About}></Route>
                </div>
                
            </Router>
        )
    }
}

ReactDOM.render(<App/>, document.getElementById('app'))

