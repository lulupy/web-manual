import React from 'react'
import {render} from 'react-dom'
import {Provider} from 'react-redux'
import createStore from './configureStore'
import rootReducer from './reducer'
import App from './containers/Root'

const store = createStore(rootReducer)

render(
    <Provider store={store}>
        <App options={[ 'reactjs', 'frontend' ]}/>
    </Provider>,
    document.getElementById('app')
)