import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { Button, Card, Heading, Overlay, Panel, PanelHeader, Input} from 'rebass'
import moment from 'moment'

import {fetch_event} from '../actions/events'
import {fetch_people} from '../actions/person'

import Register from './Register'

class Event extends React.Component {

    state={ popup : false, personIndex : null }

    componentWillMount() {
        const {dispatch, params} = this.props

        dispatch(fetch_event(params.id))
        dispatch(fetch_people(params.id))
    }

    changeDate = (e) => {
        e.preventDefault();
        let {personIndex} = this.state
        personIndex = e.target.dataset.index
        this.setState({
            personIndex : personIndex
        })

        this.setState({ popup : true })
    }
    stopPopup = (e) => {
        e.preventDefault();
        this.setState({ popup : false })
    }
    showInfo = () => {
        const {people} = this.props
        let {personIndex} = this.state
        if("undefined" !== typeof people && "undefined" !== typeof people[personIndex]){
            return(
                <Input label="Naam" name="firstname" value={people[personIndex].firstname} data-index={personIndex}/>
            )
        }
        //<Input label="Datum" name="date" value={} data-index={i} onChange={} />
        //<Input label="Begintijd" name="beginTime" value={} data-index={i} onChange={} />
        //<Input label="Eindtijd" name="endTime" value={} data-index={i} onChange={} />
    }
    showPeople = () => {
        const {people} = this.props

        if("undefined" !== typeof people){
            return (
                <table>
                    <thead>
                        <tr>
                            <th>Naam</th>
                            <th>Type</th>
                            <th>Wijzigen</th>
                        </tr>
                    </thead>
                    {people.map((person, i) => {
                        return(
                            <tbody key={i}>
                                <tr>
                                    <td>{person.firstname}</td>
                                    <td>{person.type}</td>
                                    <td><div className="fa fa-pencil" data-index={i} onClick={this.changeDate}></div></td>
                                </tr>
                            </tbody>
                        )
                    })}
                </table>
            )
        }
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
                {this.showPeople()}<br/>
                <Overlay open={this.state.popup}>
                    <Panel theme="info">
                    <PanelHeader inverted theme="default">
                        Datum wijzigen van persoon <Button onClick={this.stopPopup}>X</Button>
                    </PanelHeader>
                        {this.showInfo()}
                    </Panel>
                </Overlay>
                <Register event={event} />
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
         event : state.app.event,
         people : state.app.people
    }
}

export default connect(mapStateToProps)(Event)
