function logger(store){
    let next = store.dispatch

    return function dispatchAndLog(action){
        console.log('dispatching', action)
        let result = next(action)
        console.log('next state', store.getState())
        return result
    }
}
function crashReporter(store){
    let next = store.dispatch
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
function applyMiddlewareByMonkeypatching(store, middlewares){
    middlewares = middlewares.slice()
    middlewares.reverse()
    middlewares.forEach(middleware=>
        store.dispatch = middleware(store)
    )
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

let store = createStore(counter)
applyMiddlewareByMonkeypatching(store, [logger, crashReporter])

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