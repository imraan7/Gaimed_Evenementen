import { browserHistory } from 'react-router'
import app from '../feathers'

const service = app.service("people")

export const fetch_people = (status) => {
    return (dispatch, getState) => {
        service
            .find({
                query : {
                    status : status
                }
            })
            .then((items) => {
                dispatch(receive_people(items))
            })
            .catch(err => {
                console.log(err);
            })
    }
}

export const fetch_person = (id) => {
    return (dispatch, getState) => {
        service
            .get(id)
            .then((item) => {
                dispatch(receive_person(item))
            })
            .catch(err => {
                console.log(err);
            })
    }
}

export const create_person = (person, after) => {
    return (dispatch, getState) => {
        service
            .create(person)
            .then((item) => {
                console.log(item);

                if("undefined" !== typeof after) // zo is het optioneel
                    dispatch(after)

                browserHistory.push('/')
            })
            .catch(err => {
                console.log(err);
            })
    }
}

export const update_person = (person) => {
    return (dispatch, getState) => {
        service
            .patch(person._id, person)
            .then((item) => {
                console.log(item);
            })
            .catch(err => {
                console.log(err);
            })
    }
}

export const receive_people = (msg) => {
    return {
        type: 'RECEIVE_PEOPLE',
        msg
    }
}

export const receive_person = (msg) => {
    return {
        type: 'RECEIVE_PEOPLE',
        msg
    }
}
