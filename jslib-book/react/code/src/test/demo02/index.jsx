import React, {Component} from 'react';
import ReactDOM from 'react-dom';

import {
    BrowserRouter as Router,
    Route,
    Link
} from 'react-router-dom';

class Home extends Component{
    render (){
        return (
            <div>
                <h2>Home</h2>
            </div>
        );
    }
}


class Topic extends Component{
    render (){
        let {match} = this.props;
        return (
            <div>{match.params.topicId}</div>
        );
    }
}

class Topics extends Component{
    render (){
        let {match} = this.props;
        return (
            <div>
                <h2>Topics</h2>
                <div>
                    <ul>
                        <li><Link to={`${match.url}/topics/topic1`}>Topic1</Link></li>
                        <li><Link to={`${match.url}/topics/topic2`}>Topic2</Link></li>
                    </ul>

                    <Route path="/topics/:topicId" component={Topic}></Route>
                </div>
            </div>
        );
    }
}

class App extends Component{

    render (){
        return (
            <Router>
                <div>
                    <ul>
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/topics">Topics</Link></li>
                    </ul>

                    <Route path="/" component={Home}></Route>
                    <Route path="/topics" component={Topics}></Route>
                </div>
            </Router>
        );
        
    }
}



let div = document.createElement('div');
document.body.append(div);

ReactDOM.render(<App/>, div);
