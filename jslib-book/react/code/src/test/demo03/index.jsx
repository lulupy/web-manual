import React, {Component} from 'react';
import ReactDOM from 'react-dom';

import {
    BrowserRouter as Router,
    Route,
    Link
} from 'react-router-dom';

class Home extends Component{
    render (){
        return <div>Home</div>;
    }
}

class Math1 extends Component{
    render (){
        return <div>Math1</div>;
    }
}

class Math2 extends Component{
    render (){
        return <div>Math2</div>;
    }
}

class Math3 extends Component{
    render (){
        return <div>Math3</div>;
    }
}

class App extends Component{

    render (){
        return (
            <Router>
                <div>
                    <ul>
                        <li><Link to="/home">Home</Link></li>
                        <li><Link to="/match1/">/match1/</Link></li>
                        <li><Link to="/match1/a">/match1/a</Link></li>
                        <li><Link to="/match1/a/b">/match1/a/b</Link></li>

                        <li><Link to="/match2/hello.jpg">/match2/hello.jpg</Link></li>
                        <li><Link to="/match2/a/hello.jpg">/match2/a/hello.jpg</Link></li>
                        <li><Link to="/match2/a/b/file.jpg">/match2/a/b/file.jpg</Link></li>

                        <li><Link to="/match3/a">/match3/a</Link></li>
                        <li><Link to="/match3/a/b">/match3/a/b</Link></li>
                        <li><Link to="/match3/a.a">/match3/a.a</Link></li>

                    </ul>
                    <Route path="/home" component={Home}></Route>
                    <Route path="/match1/*" component={Math1}></Route>
                    <Route path="/match2/**/*.jpg" component={Math2}></Route>
                    <Route path="/match3/**" component={Math3}></Route>
                </div>
            </Router>
        );
        
    }
}



let div = document.createElement('div');
document.body.append(div);

ReactDOM.render(<App/>, div);
