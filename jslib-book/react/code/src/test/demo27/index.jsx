import React, {Component} from 'react'
import {createStore} from 'redux'
import {connect, Provider} from 'react-redux'
import {render} from 'react-dom'


class Counter extends Component{
    render(){
        const {value, onIncreaseClick} = this.props
        return (
            <div>
                <span>{value}</span>
                <button onClick={onIncreaseClick}>Increase</button>
            </div>
        )
    }
}

function mapStateToProps(state){
    return {
        value: state.count
    }
}

function mapDispatchToProps(dispatch){
    return {
        onIncreaseClick: () => dispatch(increaseAction)
    }
}

const increaseAction = { type: 'increase' }

const App = connect(
  mapStateToProps,
  mapDispatchToProps
)(Counter)

function counter(state = { count: 0 }, action) {
  const count = state.count
  switch (action.type) {
    case 'increase':
      return { count: count + 1 }
    default:
      return state
  }
}

const store = createStore(
  counter
);


render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('app')
);