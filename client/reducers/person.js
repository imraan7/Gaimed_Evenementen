import { modeled } from 'react-redux-form'

export const person = modeled((state = { type : "ambtenaar" }, action) => {
  switch (action.type) {
    case "RECEIVE_PERSON":
      return {...action.msg}
    default:
      return state
  }
}, 'person')

export const people = (state = [], action) => {
  switch (action.type) {
    case "RECEIVE_PEOPLE":
      return [...action.msg]
    default:
      return state
  }
}
