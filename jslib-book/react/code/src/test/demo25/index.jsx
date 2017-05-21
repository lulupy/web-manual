import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import {createStore, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import PropTypes from 'prop-types'

const INCREMENT = 'INCREMENT'
const DECREMENT = 'DECREMENT'

const defaultCount = 0;


function increment() {
  return {
    type: INCREMENT
  };
}

//action creater
function incrementAsync() {
  return dispatch => {
    setTimeout(() => {
      // Yay! Can invoke sync or async actions with `dispatch`
      dispatch(increment());
    }, 1000);
  };
}



//reducer
const counter = (state=defaultCount, action)=>{
    const {type} = action
    switch(type){
        case INCREMENT:
            return state + 1
        case DECREMENT:
            throw new Error('err')
            return state -1
        default: return state
    }
}

let store = createStore(counter, applyMiddleware(thunk))

class Counter extends Component{
    static propTypes = {
        value: PropTypes.number.isRequired,
        onIncrement: PropTypes.func.isRequired,
        onDecrement: PropTypes.func.isRequired
    }

    incrementIfOdd = ()=> {
        if(this.props.value %2 ===0){
            this.props.onIncrement()
        }
    }

    incrementAsync = ()=> {

        store.dispatch(incrementAsync())
    }

    render (){
        const {value,onIncrement, onDecrement} = this.props
        return (
            <div>

                {value}
                <button onClick={onIncrement}>+</button>
                <button onClick={onDecrement}>-</button>
                <button onClick={this.incrementIfOdd}>Increment if odd</button>
                <button onClick={this.incrementAsync}>IncrementAsync</button>
            </div>
        )
    }
}

const render = ()=>{
    ReactDOM.render(
        <Counter 
            value={store.getState()}
            onIncrement={()=>{store.dispatch({type: INCREMENT})}}
            onDecrement={()=>{store.dispatch({type: DECREMENT})}}/>,
        document.getElementById('app')
    )
}

store.subscribe(render)
render()