import 'babel-polyfill'
import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { Router, IndexRoute, Route, browserHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'

import configureStore from './store/configureStore'

const store = configureStore()
const history = syncHistoryWithStore(browserHistory, store)

import App from './containers/App'

import Home from './components/Home'
import Event from './components/Event'
import Login from './components/Login'
import ConfigureEvents from './components/ConfigureEvents'

render(
    <Provider store={store}>
        <Router history={history}>
            <Route path="/" component={App}>
                <IndexRoute component={Home} />
                <Route path="/login" component={Login}></Route>
                <Route path="/event/:id" component={Event}></Route>
                <Route path="/configureEvents" component={ConfigureEvents}></Route>
            </Route>
        </Router>
    </Provider>,
    document.getElementById('root')
)
