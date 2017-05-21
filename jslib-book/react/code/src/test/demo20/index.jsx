import {createStore} from 'redux'

const reducerFn = (state=0, action)=>{
    const {type} = action
    switch(type){
        case 'ADD':
            return state + 1
        default: return state
    }
}

const store = createStore(reducerFn)

let next = store.dispatch

store.dispatch = (action)=>{
    console.log('dispatching', action)
    next(action)
    console.log('next state', store.getState())
}

store.dispatch({type: 'ADD'})