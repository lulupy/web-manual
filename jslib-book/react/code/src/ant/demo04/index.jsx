import React, {Component} from 'react';
import ReactDOM from 'react-dom';

import { Modal } from 'antd';
import 'antd/dist/antd.css';


class App extends React.Component {
  

  render() {
    return (
        <div>
            <Modal
                title="Basic Modal" 
                visible={true}
            >
                <p>some contents...</p>
                <p>some contents...</p>
                <p>some contents...</p>
            </Modal>
        </div>
    );
  }
}

ReactDOM.render(<App/>, document.getElementById('app'));