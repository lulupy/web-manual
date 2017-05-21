import React, {Component} from 'react'
import ReactDOM from 'react-dom'

import {
    HashRouter as Router,
    Route,
    NavLink,
    Link,
    Prompt
} from 'react-router-dom'




function message(loaction){
    return 'aaaa'
}

function getUserConfirmation(message, callback){
    const allowTransition = window.confirm(message)
    callback(allowTransition)
    
}

class App extends Component {
    render (){
        return (
            <Router getUserConfirmation={getUserConfirmation}>
                <div>
                    <Link to="/home">home</Link>
                    <Route path="/home" render={()=><div>home</div>}></Route>
                    <Prompt message={message}></Prompt>
                    <Prompt message="ok"></Prompt>    
                </div>
                
            </Router>
        )
    }
}



ReactDOM.render(<App/>, document.getElementById('app'))