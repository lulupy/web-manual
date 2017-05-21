import React, {Component} from 'react';
import ReactDOM from 'react-dom';

import {
    BrowserRouter as Router,
    Route,
    Link
} from 'react-router-dom';


class Today extends Component{
    render (){
        var now = new Date;
        var today = now.getFullYear() +' '+ (now.getMonth()+1)+ ' ' + now.getDate();
        return <div>
            {today}
        </div>
    }
}

class App extends Component {
    render (){
        return (
            <Router basename="/demo">
                <div>
                    <Link to="/today">today</Link>
                    <Route path="/today" component={Today}></Route>
                </div>
            </Router>    
        );
    }
}

ReactDOM.render(<App/>, document.getElementById('app'));

