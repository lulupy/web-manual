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
            return state -1
        default: return state
    }
}

const store = createStore(counter)


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





