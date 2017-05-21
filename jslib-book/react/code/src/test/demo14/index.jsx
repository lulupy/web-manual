import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup' 

import './style.css'

class App extends React.Component {


  render() {
    return (
      <CSSTransitionGroup
        transitionName="example"
        transitionAppear={true}
        transitionAppearTimeout={500}
        transitionEnter={false}
        transitionLeave={false}>
        <h1>Fading at Initial Mount</h1>
      </CSSTransitionGroup>
    );
  }
}

ReactDOM.render(<App/>, document.getElementById('app'))