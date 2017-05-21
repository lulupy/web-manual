import React, {Component} from 'react'
import ReactDOM from 'react-dom'

import {
    HashRouter as Router,
    Route,
    NavLink,
    Link
} from 'react-router-dom'



const oddEvnet = (macth, location)=>{
    console.log(macth, location)
    if(!macth){
        return false
    }

    const eventId = parseInt(macth.params.eventId)
    return !isNaN(eventId) && eventId %2 ===1
}

class App extends Component {
    render (){
        return (
            <Router>
                <div>
                    <NavLink
                        activeStyle={{
                            color: 'red'
                        }} 
                        to="/events/123">123
                    </NavLink>

                    <Route path="/events/:eventId" render={()=><div>events</div>}></Route>
                </div>
                
            </Router>
        )
    }
}

ReactDOM.render(<App/>, document.getElementById('app'))

