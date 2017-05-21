import 'rc-dialog/assets/index.css';

import React, {Component} from 'react';
import ReactDOM from 'react-dom';

import Dialog from 'rc-dialog';

class App extends React.Component {
    render() {
        return (
            <div
                className="test"
            >
                {/*Dialog生成的dom在body下而不是在div.test下*/}
                <Dialog 
                    visible={true}
                    title="basic dialog"
                    >
                    Content
                </Dialog>
            </div>
            
        );
    }
}

ReactDOM.render(<App/>, document.getElementById('app'))


