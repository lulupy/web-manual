import './index.less';

import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import Animate from 'rc-animate';

const Div = (props) => {
    const { style, show } = props;
    const newStyle = Object.assign({}, style, {
        display: show ? '': 'none',
    })
    console.log(newStyle);
    return <div style={newStyle}/>;
}

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            enter: true
        }

        this.toggle = this.toggle.bind(this);
    }

    toggle() {
        this.setState({
            enter: !this.state.enter
        })
    }
    render() {
        const style = {
            width: '200px',
            height: '200px',
            backgroundColor: 'red',
        };
        return (
            <div>
                <button onClick={this.toggle}>显示/隐藏</button>
                <Animate
                  component=""
                  showProp="show"
                  transitionName="fade"
                >
                    <Div show={this.state.enter} style={style}></Div>
                </Animate>
            </div>
            
        );
    }
}

ReactDOM.render(<App/>, document.getElementById('app'))


