import { browserHistory } from 'react-router'
import app from '../feathers'

const service = app.service("events")

export const fetch_events = (status) => {
    return (dispatch, getState) => {
        service
            .find({
                query : {
                    status : status
                }
            })
            .then((items) => {
                dispatch(receive_events(items))
            })
            .catch(err => {
                console.log(err);
            })
    }
}

export const fetch_event = (id) => {
    return (dispatch, getState) => {
        service
            .get(id)
            .then((item) => {
                dispatch(receive_event(item))
            })
            .catch(err => {
                console.log(err);
            })
    }
}

export const create_event = (event) => {
    return (dispatch, getState) => {
        service
            .create(event)
            .then((item) => {
                console.log(item);

                browserHistory.push('/')
            })
            .catch(err => {
                console.log(err);
            })
    }
}

export const update_event = (event) => {
    return (dispatch, getState) => {
        service
            .patch(event._id, event)
            .then((item) => {
                console.log(item);
            })
            .catch(err => {
                console.log(err);
            })
    }
}

export const receive_events = (msg) => {
    return {
        type: 'RECEIVE_EVENTS',
        msg
    }
}

export const receive_event = (msg) => {
    return {
        type: 'RECEIVE_EVENT',
        msg
    }
}
