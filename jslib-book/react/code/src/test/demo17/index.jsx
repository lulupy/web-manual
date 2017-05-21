import { createStore } from 'redux'


let reducerFn = function(state=0, action){
    switch(action.type){
        case 'ADD':
            return state + action.payload
            break
        default:
            return state 
    }
}


const store = createStore(reducerFn)

store.dispatch({
    type: 'ADD',
    payload: 1
})

alert(store.getState())

store.dispatch({
    type: 'ADD',
    payload: 2
})

alert(store.getState())

store.dispatch({
    type: 'ADD',
    payload: 3
})

alert(store.getState())


