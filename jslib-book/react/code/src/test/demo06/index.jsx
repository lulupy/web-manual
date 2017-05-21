import React, {Component} from 'react'
import ReactDOM from 'react-dom'

import {
    HashRouter as Router,
    Route,
    NavLink,
    Link
} from 'react-router-dom'

class Home extends Component{
    render(){
        return <div>Home</div>
    }
}

class About extends Component{
    render(){
        let {match} = this.props
        return (
            <div>
                <h2>About</h2>
                <Link to={`${match.url}/detail`}>detail</Link>
                <Route path={`${match.url}/detail`} render={()=> <div>Detail</div>}></Route>
            </div>
        )
    }
}



class App extends Component {
    render (){
        return (
            <Router>
                <div>
                    <ul>
                        <li>
                            <NavLink 
                                strict
                                exact
                                activeClassName="selected"
                                activeStyle={{
                                    color: 'red'
                                }}
                                to="/home"
                            >
                                Home
                            </NavLink>
                        </li>
                        <li>
                            <NavLink 
                                exact
                                activeClassName="selected"
                                activeStyle={{
                                    color: 'red'
                                }}
                                to="/about"
                            >
                                About
                            </NavLink>
                        </li>
                    </ul>

                    <Route path="/home" component={Home}></Route>
                    <Route path="/about" component={About}></Route>
                </div>
                
            </Router>
        )
    }
}

ReactDOM.render(<App/>, document.getElementById('app'))

