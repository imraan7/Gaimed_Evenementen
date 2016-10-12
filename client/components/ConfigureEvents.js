import React from 'react'
import { connect } from 'react-redux'
import { Form, actions } from 'react-redux-form'
import { Button, Input, Select, Label, Panel, PanelHeader, Overlay} from 'rebass'

import {fetch_events, create_event} from '../actions/events'

class ConfigureEvents extends React.Component {

    state={ popupOpen : false, dateIndex : 0, timeIndex: 0 }

    update = (e) => {
        const {dispatch} = this.props
        dispatch(actions.change("event." + e.target.name, e))
    }

    updateDate = (e) => {
        const {dispatch} = this.props
        dispatch(actions.change(`event.dates[${this.state.dateIndex}].date`, e))
        console.log(event.dates);
    }

    updateTime = (e) => {
        const {dispatch} = this.props
        const index = e.target.dataset.index
        dispatch(actions.change(`event.dates[${this.state.dateIndex}].times[${index}].${e.target.name}`, e))
    }

    saveEvent= () => {
        const { dispatch, event } = this.props
        console.log(event);
        //dispatch(create_event(event, fetch_events))
    }

    addDate = (e) => {
        e.preventDefault();
        const {dispatch, event} = this.props

        this.setState({ popupOpen : true })

        if(event.dates.length === 0){
            dispatch(actions.change(`event.dates[${this.state.dateIndex}]`, { date : "", times : [] }))
        }
        else {
            this.setState({ dateIndex : this.state.dateIndex+1 })
            dispatch(actions.change(`event.dates[${this.state.dateIndex}].length}]`, { date : "", times : []} ))
        }
        console.log(event.dates);
    }
    stopPopup = (e) => {
        e.preventDefault();
        this.setState({ popupOpen : false })
    }
    addTime = (e) => {
        e.preventDefault();
        const { dispatch, event } = this.props

        if(event.dates[this.state.dateIndex].times.length === 0) // als er nog geen time is maak ik dit aan
            dispatch(actions.change(`event.dates[${this.state.dateIndex}].times`, [{ beginTime : "", endTime : ""}] ))
        else {
            // timeIndex omhoog
            this.setState({ timeIndex : this.state.timeIndex+1 })
            // voeg nieuwe key toe in array, die wordt automatisch rendered door die .map bij showTime
            dispatch(actions.change(`event.dates[${this.state.dateIndex}].times[${event.dates[this.state.dateIndex].times.length}]`, { beginTime : "", endTime : ""} ))
        }
    }

    showTime = () => {
        const {event} = this.props
        console.log(event.dates);

        if("undefined" !== typeof event.dates[this.state.dateIndex] && "undefined" !== typeof event.dates[this.state.dateIndex].times)
            return event.dates[this.state.dateIndex].times.map((time, i) => {
                return (
                    <div key={i}>
                        <Input label="Begintijd" name="beginTime" value={time.beginTime} data-index={i} onChange={this.updateTime} />
                        <Input label="Eindtijd" name="endTime" value={time.endTime} data-index={i} onChange={this.updateTime} />
                    </div>
                )
            })
    }

    render() {
        return (
            <Panel theme="info">
                <PanelHeader inverted theme="default">Maak nieuwe event aan</PanelHeader>
                    <div className="col-xs-12 col-md-6">
                        <Form model="event" onSubmit={this.saveEvent}>
                            <Input label="Naam" name="name" onChange={this.update} />
                            <Button onClick={this.addDate}>Datum</Button><br/><br/>
                            <Overlay open={this.state.popupOpen}>
                                <Panel theme="info">
                                    <PanelHeader inverted theme="default">
                                    Datum toevoegen <Button onClick={this.stopPopup}>X</Button>
                                    </PanelHeader>
                                    <Input label="Datum" name="date" onChange={this.updateDate} />
                                    {this.showTime()}
                                    <Button onClick={this.addTime}>+ Tijd</Button><br/>
                                    <Button onClick={this.updateDate}>Datum opslaan</Button>
                                </Panel>
                            </Overlay>
                            <Input label="Beschrijving" name="description" onChange={this.update} />
                            <Button>Opslaan</Button>
                        </Form>
                    </div>
            </Panel>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        event : state.app.event
    }
}

export default connect(mapStateToProps)(ConfigureEvents)
