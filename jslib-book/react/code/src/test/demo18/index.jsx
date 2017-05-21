import { createStore } from 'redux'

const ADD_CHAT = 'ADD_CHAT'
const CHANGE_STATUS = 'CHANGE_STATUS'
const CHANGE_USERNAME = 'CHANGE_USERNAME'

const defaultState = {
    chatLog: [],
    statusMessage: '',
    userName: ''
}

// const chatReducer = (state = defaultState, action = {})=> {
//     const {type, payload} = action
//     switch (type) {
//         case ADD_CHAT: 
//             return Object.assign({}, state, {
//                 chatLog: state.chatLog.concat(payload)
//             })
//         case CHANGE_STATUS: 
//             return Object.assign({}, state, {
//                 statusMessage: payload
//             })
//         case CHANGE_USERNAME: 
//             return Object.assign({}, state, {
//                 userName: payload
//             })
//         default: return state
//     }
// }


const chatLog = (chatLog, action)=>{
    const {type, payload} = action
    switch(type){
        case ADD_CHAT:
            return [...chatLog, action.payload]
        default:
            return chatLog
    }
    
}

const statusMessage = (statusMessage, action)=>{
    const {type, payload} = action
    switch(type){
        case CHANGE_STATUS:
            return payload
        default:
            return statusMessage
    }
}

const userName = (userName, action)=>{
    const {type, payload} = action
    switch(type){
        case CHANGE_USERNAME:
            return payload
        default:
            return userName
    }
}

const chatReducer = (state = defaultState, action = {}) =>{
    return {
        chatLog: chatLog(state.chatLog, action),
        statusMessage: statusMessage(state.statusMessage, action),
        userName: userName(state.userName, action)
    }
}

let store = createStore(chatReducer)

store.dispatch({
    type: ADD_CHAT,
    payload: 'chat1'
})

console.log(store.getState())

store.dispatch({
    type: CHANGE_USERNAME,
    payload: 'userName'
})

console.log(store.getState())