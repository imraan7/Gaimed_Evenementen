import { modeled } from 'react-redux-form'

export const event = modeled((state = { dates :[] }, action) => {
  switch (action.type) {
    case "RECEIVE_EVENT":
      return {...action.msg}
    default:
      return state
  }
}, 'event')

export const events = (state = [], action) => {
  switch (action.type) {
    case "RECEIVE_EVENTS":
      return [...action.msg]
    default:
      return state
  }
}
