function logger(store){
    return function wrapDispatchToAddLogging(next){
        return function dispatchAndLog(action){
            console.log('dispatching', action)
            let result = next(action)
            console.log('next state', store.getState())
            return result
        }
    }
}

function crashReporter(store){
    return function wrapDispatchToAddCrashReporting(next){
        return function dispatchAndCrashReport(action){
            try{
                return next(action)
            }
            catch(err){
                console.error('捕获一个异常!', err)
                // throw err
            }
        }
    }
}

//这正是 redux middleware的样子
//middleware接收了一个`next` 的dispatch函数， 并返回一个dispatch函数， 返回的函数会被作为下一个middleware的next

var compose = function(...args) {
    var len = args.length
    var count = len - 1
    var result
    return function f1(...args1) {
        result = args[count].apply(this, args1)
        if (count <= 0) {
            count = len - 1
            return result
        } else {
            count--
            return f1.call(null, result)
        }
    }
}
function applyMiddleware(...middlewares) {
  return (createStore) => (reducer, preloadedState, enhancer) => {
    var store = createStore(reducer, preloadedState, enhancer);
    var dispatch = store.dispatch;
    var chain = [];

    var middlewareAPI = {
      getState: store.getState,
      dispatch: (action) => dispatch(action)
    };

    chain = middlewares.map(middleware => middleware(middlewareAPI));
    dispatch = compose(...chain)(store.dispatch);

    return {...store, dispatch}
  }
}

import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import {createStore} from 'redux'
import PropTypes from 'prop-types'

const INCREMENT = 'INCREMENT'
const DECREMENT = 'DECREMENT'

const defaultCount = 0;

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

let store = createStore(counter, applyMiddleware(logger, crashReporter))

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

        setTimeout(this.props.onIncrement, 2000)
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