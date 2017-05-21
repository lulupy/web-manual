import React, {Component} from 'react'
import ReactDOM from 'react-dom'

import {
    BrowserRouter as Router,
    Route,
    Link
} from 'react-router-dom'

class Component1 extends Component {

    constructor(props){
        console.log('component1 new')
        super(props)
        this.state = {}
        this.clickHandler = this.clickHandler.bind(this)
    }

    render (){

        let isRed = this.state.isRed
        return (
            <div onClick={this.clickHandler} style={{background: isRed?'red': 'black'}}>Component1</div>
        )
    }

    clickHandler(ev){
        this.setState({
            isRed: true
        })
    }
}

class Component2 extends Component {
    render (){
        return (
            <div>Component2</div>
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
                            <Link to="/component1">component1</Link>
                        </li>
                        <li>
                            <Link to="/component2">component2</Link>
                        </li>
                    </ul>
                    <Route path="/component1" component={Component1}></Route>
                    <Route path="/component2" component={Component2}></Route>
                </div>
            </Router>
        )
    }
}



ReactDOM.render(<App/>, document.getElementById('app'))