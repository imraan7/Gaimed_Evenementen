import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import { routerReducer } from 'react-router-redux'
import thunk from 'redux-thunk'

import app from '../reducers'

const reducer = combineReducers({
    app : app,
    routing: routerReducer
})

export default function configureStore(initialState) {

    const finalCreateStore = compose(
        applyMiddleware(thunk),
        //devTools(),
        window.devToolsExtension ? window.devToolsExtension() : f => f
        //persistState(window.location.href.match(/[?&]debug_session=([^&]+)\b/))
    )(createStore)

    const store = finalCreateStore(reducer)

    return store
}
