import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { Button, Card, Heading} from 'rebass'
import moment from 'moment'

import {fetch_event} from '../actions/events'

import Register from './Register'

class Event extends React.Component {

    componentWillMount() {
        const {dispatch, params} = this.props

        dispatch(fetch_event(params.id))
    }

    render() {

        const {event} = this.props

        return (
            <div className="container">
                <Card rounded width={256}>
                    <div className="col-xs-12 col-md-6">
                        <Heading level={2} size={3}>{event.name}</Heading>
                        <div>
                            {event.dates.map(date => {
                                return (
                                    <div key={date.date}>
                                        Datum: {moment(date.date).format("DD-MM-YYYY")} <br/>
                                        Tijd: {date.times.map(time => {
                                            return (time + "-")
                                        })}
                                    </div>
                                )
                            })}
                        </div>
                        <h3>Omschrijving: {event.description}</h3>
                    </div>
                </Card>
                <Register event={event} />
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
         event : state.app.event,
    }
}

export default connect(mapStateToProps)(Event)
