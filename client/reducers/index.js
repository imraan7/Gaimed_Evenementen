import {combineReducers} from 'redux'

import {event, events} from './event'
import {person, people} from './person'

const rootReducer = combineReducers({
    event, events,
    person, people,
})

export default rootReducer
